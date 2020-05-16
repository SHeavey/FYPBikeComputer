package com.example.cyclerpm;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.util.Log;

import com.jjoe64.graphview.GraphView;
import com.jjoe64.graphview.series.DataPoint;
import com.jjoe64.graphview.series.LineGraphSeries;

import java.util.ArrayList;
import java.util.List;

public class ActivityGraph extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_graph);
        DBHelper db = new DBHelper(this);//calling constructor of dbhelper, which is creating the database


        Log.d("Reading: ", " all current speed points..");
        GraphView graph = (GraphView) findViewById(R.id.graph);
        List<Speed> contacts = db.getAllContacts();
        DataPoint[] dp = new DataPoint[contacts.size()];
        List<DataPoint> dataPoints = new ArrayList<DataPoint>();
            int i=0;
            for (Speed cn : contacts) {
            String log = "Id: " + cn.getID() + " ,Speed: " + cn.getSpeed() + " ,Time: " +
                    cn.gettime();
                dp[i] = new DataPoint(i,Integer.parseInt(cn.getSpeed())); //(1,20)(2,30)
                i=i+1;
            // Writing Contacts to log
            Log.d("Name: ", log);
        }
        LineGraphSeries<DataPoint> series = new LineGraphSeries<>(dp);

        graph.getViewport().setScalable(true);
        graph.getViewport().setScalableY(true);
        graph.getViewport().setScrollable(true); // enables horizontal scrolling
        graph.getViewport().setScrollableY(true); // enables vertical scrolling
        graph.setTitle("TIME(s)");
        graph.addSeries(series);

    }
}
