package com.example.cyclerpm;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

public class ActivityTwo extends AppCompatActivity implements View.OnClickListener {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_two);
        Intent intent = getIntent();
        String text = intent.getStringExtra(MainActivity.EXTRA_TEXT);
        String text2 = intent.getStringExtra(MainActivity.EXTRA_TEXT2);

        TextView textView1 = (TextView) findViewById(R.id.textview1);
        TextView textView2 = (TextView) findViewById(R.id.textview2);

        textView1.setText("Hi " + text);
        textView2.setText("Wheel circumference is " + text2 + "mm, which means radius is " +String.format("%.2f",Integer.parseInt(text2)/(2*3.14))+"mm.                                   " +
                "Formula used: Circumference/2*π");



        Button graph = findViewById(R.id.graph);
        Button map = findViewById(R.id.map);
        Button speed = findViewById(R.id.speed);

        graph.setOnClickListener(this);
        map.setOnClickListener(this);
        speed.setOnClickListener(this);

    }


    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.graph:
                openGraphActivity();
                break;
            case R.id.map:
                openMapActivity();
                break;
            case R.id.speed:
                openSpeedActivity();
                break;

        }
    }

    public void openGraphActivity() {
       /* EditText editText1 = (EditText) findViewById(R.id.edittxt1);
        String text = editText1.getText().toString();

        EditText editText2 = (EditText) findViewById(R.id.edittxt2);
        String text2 = editText2.getText().toString();

        TextView textView = (TextView) findViewById(R.id.txtview1) ;
        textView.setText("Enter name + wheel size!");*/


        Intent intent2 = new Intent(this, ActivityGraph.class);
        //intent.putExtra(EXTRA_TEXT, text);
        //intent.putExtra(EXTRA_TEXT2, text2);
        startActivity(intent2);
    }


    public void openMapActivity() {

        Intent intent3 = new Intent(this, ActivityMap.class);
        startActivity(intent3);
    }
    public void openSpeedActivity() {
        Intent intent4 = new Intent(this, ActivitySpeed.class);
        startActivity(intent4);
    }
}
