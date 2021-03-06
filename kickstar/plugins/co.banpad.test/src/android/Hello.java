package com.example.plugin;

import org.apache.cordova.*;
import org.json.JSONArray;
import org.json.JSONException;
import java.net.*;
import java.io.*;

public class Hello extends CordovaPlugin {

	DatagramPacket datagramPacket;
	DatagramSocket datagramSocket;
	boolean successInitializingTransmitter = false;

	@Override
	public boolean execute(String action, JSONArray args, final CallbackContext callbackContext) throws JSONException {

		if (action.equals("initialize")) {

			final String host = args.getString(0);
			final int port = args.getInt(1);
			// Run the UDP transmitter initialization on its own thread (just in
			// case, see sendMessage comment)
			cordova.getThreadPool().execute(new Runnable() {
				public void run() {
					this.initialize(host, port, callbackContext);
				}

				private void initialize(String host, int port, CallbackContext callbackContext) {
					boolean successResolvingIPAddress = false;
					// create packet
					InetAddress address = null;
					try {
						// 'host' can be a ddd.ddd.ddd.ddd or named URL, so
						// doesn't always resolve
						address = InetAddress.getByName(host);
						successResolvingIPAddress = true;
					} catch (UnknownHostException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
					// If we were able to resolve the IP address from the host
					// name, we're good to try to initialize
					if (successResolvingIPAddress) {
						byte[] bytes = new byte[0];
						datagramPacket = new DatagramPacket(bytes, 0, address, port);
						// create socket
						try {
							if(successInitializingTransmitter == false)
							{	
							    datagramSocket = new DatagramSocket(8888, InetAddress.getByName("0.0.0.0"));
							    successInitializingTransmitter = true;
							    datagramSocket.setSoTimeout(125);
							}
						}
						catch (UnknownHostException e) {
							e.printStackTrace();
						}
						catch (SocketException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
					}
					if (successInitializingTransmitter)
						callbackContext.success(": " + host);
					else
						callbackContext.error(": " + host);
				}
			});
			return true;
		} else if ("sendMessage".equals(action)) {
			final String message = args.getString(0);
			// Run the UDP transmission on its own thread (it fails on some
			// Android environments if run on the same thread)
			cordova.getThreadPool().execute(new Runnable() {
				public void run() {
					this.sendMessage(message, callbackContext);
				}

				private void sendMessage(String data, CallbackContext callbackContext) {
					boolean messageSent = false;
					// Only attempt to send a packet if the transmitter
					// initialization was successful
					if (successInitializingTransmitter) {
						byte[] bytes = data.getBytes();
						datagramPacket.setData(bytes);
						try {
							datagramSocket.send(datagramPacket);
							messageSent = true;
						} catch (IOException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
					}
					if (messageSent)
						callbackContext.success(": " + data);
					else
						callbackContext.error(": " + data);
				}
			});
			return true;
		} else if ("listenForPackets".equals(action)) {

			cordova.getThreadPool().execute(new Runnable() {
				public void run() {
					this.listenForPackets(callbackContext);
				}

				private void listenForPackets(CallbackContext callbackContext) {
			        byte[] recvBuf = new byte[16];
			        DatagramPacket packet = new DatagramPacket(recvBuf, recvBuf.length);
			        String message = null;
					boolean messageReceive = false;
					// Only attempt to send a packet if the transmitter
					// initialization was successful
					if (successInitializingTransmitter) {
						try {
							datagramSocket.receive(packet);
							message = new String(packet.getData()).trim();
							messageReceive = true;
					    } 
						catch (SocketTimeoutException e) {
							e.printStackTrace();
					    }
						catch (IOException e) {
							e.printStackTrace();
						}
						
					}
					if (messageReceive)
						callbackContext.success(message);
					else
						callbackContext.error("Error: listenForPackets - no packets.");
				}
			});
			return true;
		}

		return false;
	}
}
