package com.example.cyclerpm;

import androidx.appcompat.app.AppCompatActivity;

import android.graphics.Color;
import android.os.Bundle;
import android.util.Log;
import android.widget.TextView;
import android.widget.Toast;

import com.cardiomood.android.controls.gauge.SpeedometerGauge;

import org.eclipse.paho.android.service.MqttAndroidClient;
import org.eclipse.paho.client.mqttv3.IMqttActionListener;
import org.eclipse.paho.client.mqttv3.IMqttDeliveryToken;
import org.eclipse.paho.client.mqttv3.IMqttToken;
import org.eclipse.paho.client.mqttv3.MqttCallback;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;

public class ActivitySpeed extends AppCompatActivity implements MqttCallback {
    public MqttAndroidClient client;
    public SpeedometerGauge speedometer;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_speed);

        speedometer = (SpeedometerGauge) findViewById(R.id.speedometer);

        // Add label converter
        speedometer.setLabelConverter(new SpeedometerGauge.LabelConverter() {
            @Override
            public String getLabelFor(double progress, double maxProgress) {
                return String.valueOf((int) Math.round(progress));
            }
        });

        speedometer.setMaxSpeed(30);
        speedometer.setMajorTickStep(30);
        speedometer.setMinorTicks(2);


        // Configure value range colors
        speedometer.addColoredRange(0, 10, Color.GREEN);
        speedometer.addColoredRange(10, 20, Color.YELLOW);
        speedometer.addColoredRange(20, 30, Color.RED);



        final String clientId = MqttClient.generateClientId();
        client =
                new MqttAndroidClient(this.getApplicationContext(), "tcp://farmer.cloudmqtt.com:11836",
                        clientId);
        MqttConnectOptions options = new MqttConnectOptions();
        options.setMqttVersion(MqttConnectOptions.MQTT_VERSION_3_1);
        options.setUserName("gevhoohx");
        options.setPassword("C3pzwLvEM5ns".toCharArray());
        try {
            IMqttToken token = client.connect(options);

            token.setActionCallback(new IMqttActionListener() {
                @Override
                public void onSuccess(IMqttToken asyncActionToken) {
                    // We are connected
                    client.setCallback(ActivitySpeed.this);
                    final String topic = "Speed";
                    int qos = 1;
                    try {
                        IMqttToken subToken = client.subscribe(topic, qos);
                        client.subscribe("MSpeed",1);
                        client.subscribe("RPM",1);
                        client.subscribe("Distance",1);
                        client.subscribe("ASpeed",1);

                        subToken.setActionCallback(new IMqttActionListener() {
                            @Override
                            public void onSuccess(IMqttToken asyncActionToken) {
                                // successfully subscribed
                                Toast.makeText(ActivitySpeed.this, "Successfully subscribed to: " + topic, Toast.LENGTH_SHORT).show();

                            }

                            @Override
                            public void onFailure(IMqttToken asyncActionToken,
                                                  Throwable exception) {
                                // The subscription could not be performed, maybe the user was not
                                // authorized to subscribe on the specified topic e.g. using wildcards
                                Toast.makeText(ActivitySpeed.this, "Couldn't subscribe to: " + topic, Toast.LENGTH_SHORT).show();

                            }
                        });
                    } catch (MqttException e) {
                        e.printStackTrace();
                    } catch (NullPointerException e) {
                        e.printStackTrace();
                    }
                }

                @Override
                public void onFailure(IMqttToken asyncActionToken, Throwable exception) {
                    // Something went wrong e.g. connection timeout or firewall problems
                    Log.d("Bike Computer", "onFailure");

                }
            });
        } catch (MqttException e) {
            e.printStackTrace();
        }
    }
    @Override
    public void connectionLost(Throwable cause) {

    }

    @Override
    public void messageArrived(String topic, MqttMessage message) throws Exception {

        /*
         * To test ,publish  "open"/"close" at topic you subscibed app to in above .
         * */
        Log.d("msg",topic);
      if (topic.equals("Speed")) {
            TextView val2 = (TextView) findViewById(R.id.value);
            Log.d("speed", message.toString());
            val2.setText(message.toString() + " km/h");
          speedometer.setSpeed(Double.parseDouble(message.toString()),true);
          Long tsLong = System.currentTimeMillis()/1000;
          String ts = tsLong.toString();
          DBHelper db = new DBHelper(this);


          // Inserting Contacts
          Log.d("Insert: ", "Inserting ..");
          db.addContact(new Speed(message.toString(), ts));



      }
        if (topic.equals("ASpeed")) {
            TextView val = (TextView) findViewById(R.id.Aspeed);
            Log.d("Aspeed", message.toString());
            val.setText(message.toString() + " km/h");
            int ival = Integer.parseInt(message.toString());


        }
        if (topic.equals("MSpeed")) {
            TextView val = (TextView) findViewById(R.id.Mspeed);
            Log.d("Mspeed", message.toString());
            val.setText(message.toString() + " km/h");
            int ival = Integer.parseInt(message.toString());


        }
        if (topic.equals("Distance")) {
            TextView val = (TextView) findViewById(R.id.distance);
            Log.d("Distance", message.toString());
            val.setText(message.toString() + " km");
            int ival = Integer.parseInt(message.toString());


        }
        if (topic.equals("RPM")) {
            TextView val = (TextView) findViewById(R.id.RPM);
            Log.d("RPM", message.toString());
            val.setText(message.toString() + " RPM");
            int ival = Integer.parseInt(message.toString());


        }
    }

    @Override
    public void deliveryComplete(IMqttDeliveryToken token) {

    }
}
