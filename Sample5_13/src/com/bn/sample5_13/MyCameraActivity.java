package com.bn.sample5_13;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;

import android.app.Activity;
import android.content.pm.ActivityInfo;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.PixelFormat;
import android.hardware.Camera;
import android.hardware.Camera.PictureCallback;
import android.hardware.Camera.ShutterCallback;
import android.os.Bundle;
import android.os.Environment;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.SubMenu;
import android.view.SurfaceHolder;
import android.view.SurfaceView;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.view.View.OnClickListener;
import android.widget.Button;
//import android.widget.ImageView;
import android.widget.Toast;

public class MyCameraActivity extends Activity implements
		SurfaceHolder.Callback, OnClickListener {

	SurfaceView mySurfaceView; // SurfaceView的引用
	SurfaceHolder mySurfaceHolder; // SurfaceHolder的引用
	Button jiaoju; // 聚焦按鈕
	Button bTpg; // 拍照按鈕
	Button yulan; // 預覽按鈕
	static Camera myCamera; // Camera的引用
	Bitmap bm; // 拍攝的照片
	final int MENU_MAIN = 0; // 主菜單
	final int MENU_JIAO = 1;
	final int GROUP_JIAO = 2;
	final int JIAO1 = 3;
	final int JIAO2 = 4;
	final int JIAO3 = 5;
	final int JIAO4 = 6;
	final int JIAO5 = 7;
	MenuItem[] jiao = new MenuItem[5];
	
	DatagramSocket socket;
	Thread UDPBroadcastThread;
	
	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		// 設置為豎屏
		this.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);
		// 設置全屏顯示
		requestWindowFeature(Window.FEATURE_NO_TITLE);
		getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN,
				WindowManager.LayoutParams.FLAG_FULLSCREEN);
		// 設置顯示主界面
		setContentView(R.layout.main);
		// 得到拍照預覽SurfaceView的引用
		mySurfaceView = (SurfaceView) findViewById(R.id.mySurfaceView);
		// 初始化開始按鈕引用
		jiaoju = (Button) findViewById(R.id.Button01);
		// 初始化拍照按鈕引用
		bTpg = (Button) findViewById(R.id.Button03);
		// 為三個按鈕添加監聽器
		jiaoju.setOnClickListener(this);
		bTpg.setOnClickListener(this);
		// 獲得SurfaceHolder
		mySurfaceHolder = mySurfaceView.getHolder();
		// 添加回調接口的實現
		mySurfaceHolder.addCallback(this);
		mySurfaceHolder.setType(SurfaceHolder.SURFACE_TYPE_PUSH_BUFFERS);
		
		startListenForUDPBroadcast();
		Log.i("UDP", "Service started");
	}

	@Override
	protected void onPause() {
		super.onPause();
		if (myCamera != null) {// 若相機不為空則釋放相機
			myCamera.stopPreview(); // 停止預覽
			myCamera.release(); // 釋放照相機對象
			myCamera = null; // 清空照相機引用
		}
	}

	// 初始化相機的方法
	public void initCamera() {
		if (myCamera == null) {// 若在非預覽狀態且未打開照相機則打開照相機
			myCamera = Camera.open();
		}
		if (myCamera != null) {// 若照相機成功打開且處在非預覽狀態則進入預覽狀態
			try {
				Camera.Parameters myParameters = myCamera.getParameters();
				// 設置照片格式
				myParameters.setPictureFormat(PixelFormat.JPEG);
				myParameters.setRotation(0);
				// 將參數設置入Camera
				myCamera.setParameters(myParameters);
				// 設置照相機的預覽者
				myCamera.setPreviewDisplay(mySurfaceHolder);
				// 開始預覽
				myCamera.startPreview();

			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}

	ShutterCallback myShutterCallback = new ShutterCallback() {// 快門回調接口
		public void onShutter() {
		} // 空實現
	};
	PictureCallback myRawCallback = new PictureCallback() {// 拍照回調接口
		public void onPictureTaken(byte[] data, Camera camera) {
		} // 空實現
	};
	PictureCallback myjpegCallback = new PictureCallback() {// 拍照回調接口
		public void onPictureTaken(byte[] data, Camera camera) {
			bm = BitmapFactory.decodeByteArray(data, 0, data.length);
			String path = Environment.getExternalStorageDirectory()
					.getAbsolutePath();
			// 尋找可以使用的文件名
			int c = 0;
			File fTest = new File(path + "/mc" + c + ".jpg");
			while (fTest.exists()) {
				c++;
				fTest = new File(path + "/mc" + c + ".jpg");
			}
			try {
				FileOutputStream fout = new FileOutputStream(fTest);
				BufferedOutputStream bos = new BufferedOutputStream(fout);
				bm.compress(Bitmap.CompressFormat.JPEG, // 圖片格式
						80, // 品質0-100
						bos // 使用的輸出流
				);
				bos.flush();
				bos.close();
				Toast.makeText(MyCameraActivity.this,
						"保存成功，文件名：mc" + c + ".jpg", Toast.LENGTH_SHORT).show();
			} catch (Exception e) {
				Toast.makeText(MyCameraActivity.this, "保存失敗！",
						Toast.LENGTH_SHORT).show();
			}
			bm.recycle();
			myCamera.startPreview();

		}
	};

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		SubMenu jiaoju = menu
				.addSubMenu(MENU_MAIN, MENU_JIAO, 0, R.string.jiao); // 創建聚焦菜單
		jiao[0] = jiaoju.add(GROUP_JIAO, JIAO1, 0, R.string.jiao1); // 創建子菜單1
		jiao[1] = jiaoju.add(GROUP_JIAO, JIAO2, 0, R.string.jiao2); // 創建子菜單2
		jiao[2] = jiaoju.add(GROUP_JIAO, JIAO3, 0, R.string.jiao3); // 創建子菜單3
		jiao[3] = jiaoju.add(GROUP_JIAO, JIAO4, 0, R.string.jiao4); // 創建子菜單4
		jiao[4] = jiaoju.add(GROUP_JIAO, JIAO5, 0, R.string.jiao5); // 創建子菜單5
		jiaoju.setGroupCheckable(GROUP_JIAO, true, true); // 設置為單選按鈕
		jiao[0].setChecked(true); // 子菜單1為默認選中
		return super.onCreateOptionsMenu(menu);
	}

	@Override
	public boolean onOptionsItemSelected(MenuItem item) {
		switch (item.getItemId()) {
		case JIAO1:
			jiao[0].setChecked(true);
			setzoom(1);
			break; // 選中子菜單1時設置焦距為1
		case JIAO2:
			jiao[1].setChecked(true);
			setzoom(4);
			break; // 選中子菜單1時設置焦距為4
		case JIAO3:
			jiao[2].setChecked(true);
			setzoom(8);
			break;// 選中子菜單1時設置焦距為8
		case JIAO4:
			jiao[3].setChecked(true);
			setzoom(12);
			break;// 選中子菜單1時設置焦距為12
		case JIAO5:
			jiao[4].setChecked(true);
			setzoom(15);
			break;// 選中子菜單1時設置焦距為15
		}
		return super.onOptionsItemSelected(item);
	}

	// 重寫SurfaceHolder.Callback接口中的方法
	public void surfaceChanged(SurfaceHolder arg0, int arg1, int arg2, int arg3) {
	}

	// 重寫SurfaceHolder.Callback接口中的方法
	public void surfaceCreated(SurfaceHolder arg0) {
		initCamera();
	}

	// 重寫SurfaceHolder.Callback接口中的方法
	public void surfaceDestroyed(SurfaceHolder arg0) {
	}

	// 重寫OnClickListener接口中的方法
	public void onClick(View v) {
		if (v == jiaoju) // 點擊焦距按鈕
		{
			MyCameraActivity.this.openOptionsMenu();// 調用系統菜單按鈕
		} else if (v == bTpg) // 按下拍照按鈕
		{
			if (myCamera != null) {
				myCamera.takePicture(myShutterCallback, myRawCallback,
						myjpegCallback);// 拍照

			}

		}
	}

	public void setzoom(int zoom) // 調焦距方法
	{

		if (myCamera != null) {
			Camera.Parameters myParameters = myCamera.getParameters();// 獲得Camera
																		// 參數
			if (myParameters.isSmoothZoomSupported()) // 是否支持調焦距
			{
				myParameters.setZoom(zoom); // 調焦距
			}
			myCamera.setParameters(myParameters); // 設置參數
		}
	}
	
	private void listenAndWaitAndThrowIntent(InetAddress broadcastIP, Integer port) throws Exception {
		byte[] recvBuf = new byte[15000];
		if (socket == null || socket.isClosed()) {
			socket = new DatagramSocket(port, broadcastIP);
			socket.setBroadcast(true);
		}
		//socket.setSoTimeout(1000);
		DatagramPacket packet = new DatagramPacket(recvBuf, recvBuf.length);
		Log.e("UDP", "Waiting for UDP broadcast");
		socket.receive(packet);
		
		String senderIP = packet.getAddress().getHostAddress();
		String message = new String(packet.getData()).trim();
		
		Log.e("UDP", "Got UDB broadcast from " + senderIP + ", message: " + message);
		
		if(message.equals("take")) {
			if (myCamera == null)
				myCamera = Camera.open();
			myCamera.takePicture(myShutterCallback, myRawCallback,
						myjpegCallback);// 拍照

		}
	
		//broadcastIntent(senderIP, message);
		socket.close();
	}
	
	void startListenForUDPBroadcast() {
		UDPBroadcastThread = new Thread(new Runnable() {
			public void run() {
				try {
					InetAddress broadcastIP = InetAddress.getByName("192.168.11.255"); //172.16.238.42 //192.168.1.255
					Integer port = 12345;
					while (true) {
						listenAndWaitAndThrowIntent(broadcastIP, port);
					}
					//if (!shouldListenForUDPBroadcast) throw new ThreadDeath();
				} catch (Exception e) {
					Log.i("UDP", "no longer listening for UDP broadcasts cause of error " + e.getMessage());
				}
			}
		});
		UDPBroadcastThread.start();
	}
	
}