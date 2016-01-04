package tw.dac.androidsample_udpactivity;

import java.io.IOException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;
import java.net.SocketException;
import java.net.SocketTimeoutException;
import java.net.UnknownHostException;
import java.util.Timer;
import java.util.TimerTask;
import java.util.concurrent.atomic.AtomicBoolean;

import android.app.Activity;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.text.format.Time;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

public class AndroidSample_UdpActivity extends Activity {
	TextView tv1;
	Button bt1;
	EditText et1;
	// Time t;
	// private static final int UDP_SERVER_PORT = 52790;
	boolean btbol, Btbol;
	DatagramSocket ds, tsttsl;
	
	Handler handler = new Handler() {
		@Override
		public void handleMessage(Message msg) {
			super.handleMessage(msg);
			String msgString = (String) msg.obj;
			// t.setToNow();
			tv1.setText( // String.valueOf(t.hour)+":"+
					// String.valueOf(t.minute)+":"+
					// String.valueOf(t.second)+"=>"+
					msgString + "\n" + tv1.getText().toString());
		}
	};

	AtomicBoolean isRunning = new AtomicBoolean(false);

	/** Called when the activity is first created. */
	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.main);
		tv1 = (TextView) findViewById(R.id.TextView01);
		bt1 = (Button) findViewById(R.id.button1);
		et1 = (EditText) findViewById(R.id.editText1);
		// t=new Time();
		btbol = false;
		Btbol = false;
		ds = null;
		tsttsl = null;
	}

	public class MyTimerTask extends TimerTask {

		public void run() {
			InetAddress serverAddr = null;
			try {
				serverAddr = InetAddress
						.getByName("192.168.12." + String.valueOf(Integer.parseInt(et1.getText().toString()) + 100));
			} catch (NumberFormatException | UnknownHostException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
			DatagramPacket tss = new DatagramPacket("tss".getBytes(), "tss".length(), serverAddr, 5005);
			try {
				tsttsl.send(tss);
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

		}
	};

	public void Bt01_OnClick(View view) {
		Btbol = true;
	}

	public void bt1_OnClick(View view) {
		btbol = true;
	}

	public void onStart() {
		super.onStart();
		tv1.setText("WantFreq:RealFreq");
		et1.setText("35");
		Thread background = new Thread(new Runnable() {
			public void run() {
				/*
				 * try { String data; byte[] recevieData = new byte[1024];
				 * DatagramPacket dp = new DatagramPacket(recevieData,
				 * recevieData.length);
				 * 
				 * ds = new DatagramSocket(UDP_SERVER_PORT);
				 * 
				 * for (;isRunning.get();) { Thread.sleep(100); ds.receive(dp);
				 * data = new String(recevieData, 0, dp.getLength());
				 * handler.sendMessage(handler.obtainMessage(1,data)); } } catch
				 * (Throwable t) { // just end the background thread }
				 */
				try {
					String data = null;
					byte[] recevieData = new byte[1024];
					DatagramPacket dp = new DatagramPacket(recevieData, recevieData.length);
					ds = new DatagramSocket(15005);
					ds.setSoTimeout(100);
					// ds.setBroadcast(true); //設定允許廣播

					tsttsl = new DatagramSocket(5005);
					for (; isRunning.get();) {
						// Thread.sleep(1000);

						if (true == Btbol) {
							InetAddress serverAddr = InetAddress.getByName(
									"192.168.12." + String.valueOf(Integer.parseInt(et1.getText().toString()) + 100));
							DatagramPacket tst = new DatagramPacket("tst".getBytes(), "tst".length(), serverAddr, 5005);
							try {
								tsttsl.send(tst);
							} catch (IOException e) {
								// TODO Auto-generated catch block
								e.printStackTrace();
							}
							Timer timer = new Timer(true);
							timer.schedule(new MyTimerTask(), 100);
							Btbol = false;
						} 
						else if (true == btbol) {
							InetAddress serverAddr = InetAddress.getByName(
									"192.168.12." + String.valueOf(Integer.parseInt(et1.getText().toString()) + 100));
							DatagramPacket tsl = new DatagramPacket("tsl".getBytes(), "tsl".length(), serverAddr, 5005);
							try {
								tsttsl.send(tsl);
							} catch (IOException e) {
								// TODO Auto-generated catch block
								e.printStackTrace();
							}
							Timer timer = new Timer(true);
							timer.schedule(new MyTimerTask(), 100);
							btbol = false;
						}

						try {
							ds.receive(dp);
							if( dp.getAddress().getHostAddress().equals( "192.168.12." + String.valueOf(Integer.parseInt(et1.getText().toString()) ) ) )
							    data = new String(recevieData, 0, dp.getLength());
							    handler.sendMessage(handler.obtainMessage(1, data));
						} catch (IOException e) {
							continue;
						}

					}
				} catch (UnknownHostException | SocketException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		});

		isRunning.set(true);
		background.start();
	}

	public void onStop() {
		super.onStop();
		isRunning.set(false);
	}
}