package com.example.pragathi.androidwearapplication;

import android.app.Activity;
import android.os.Bundle;
import android.os.StrictMode;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class MainActivity extends Activity {

    private TextView mTextView;
    private EditText key;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.round_activity_main);
        mTextView = (TextView) findViewById(R.id.textView_display);
        Button button = (Button) findViewById(R.id.button2);
        StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();
        StrictMode.setThreadPolicy(policy);
    }

    public void sentimental(View v) {
        key = (EditText) findViewById(R.id.editext_cityname);
        String s = key.getText().toString();
        String z = s.replace(" ", "_");

        String UR = "https://gateway-a.watsonplatform.net/calls/text/TextGetTextSentiment?apikey=d0e7bf68cdda677938e6c186eaf2b755ef737cd8&outputMode=json&text="+ z;
        //Toast.makeText(this, "my url="+UR, Toast.LENGTH_SHORT).show();
        String res = null;
        BufferedReader bf = null;
        try {
            URL url = new URL(UR);
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("GET");
            con.connect();

            bf = new BufferedReader(new InputStreamReader(con.getInputStream()));
            StringBuilder str = new StringBuilder();
            String line = null;

            // Read Server Response
            while ((line = bf.readLine()) != null) {
                // Append server response in string
                str.append(line + " ");
            }
            res = str.toString();
           // Toast.makeText(this, " "+res, Toast.LENGTH_SHORT).show();
        } catch (Exception ex) {
            String Error = ex.getMessage();
        } finally {
            try {
                bf.close();
            } catch (Exception ex) {
                String Error = ex.getMessage();
            }
        }
        try {
            JSONObject f = new JSONObject(res);
            JSONObject t = f.getJSONObject("docSentiment");
           // JSONObject n =t.getJSONObject("display_location");
            String dis = t.getString("score");
            String type = t.getString("type");
           String word=  ((EditText) findViewById(R.id.editext_cityname)).getText().toString();
            if(dis==null){
                Toast.makeText(this, "Sorry couldn't get data....!", Toast.LENGTH_SHORT).show();
            }
            mTextView.setText("Sentimental Analysis-"+word+":"+"\n" + dis.toString()+","+type.toString());
        } catch (Exception e) {
           // Toast.makeText(this, "weather button parse clicked", Toast.LENGTH_SHORT).show();
            String Error = e.getMessage();
        }
    }
}
