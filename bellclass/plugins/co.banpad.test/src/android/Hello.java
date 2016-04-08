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
							datagramSocket = new DatagramSocket();
							successInitializingTransmitter = true;

						} catch (SocketException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
					}
					if (successInitializingTransmitter)
						callbackContext.success(
								"Success initializing UDP transmitter using datagram socket: " + datagramSocket);
					else
						callbackContext
								.error("Error initializing UDP transmitter using datagram socket: " + datagramSocket);
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
						callbackContext.success("Success transmitting UDP packet: " + datagramPacket);
					else
						callbackContext.error("Error transmitting UDP packet: " + datagramPacket);
				}
			});
			return true;
		}
		return false;
	}
}
