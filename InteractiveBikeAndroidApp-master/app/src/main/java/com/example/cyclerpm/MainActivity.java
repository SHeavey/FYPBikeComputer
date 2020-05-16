package com.example.cyclerpm;

import android.content.Intent;
import android.os.Bundle;

import com.google.android.material.floatingactionbutton.FloatingActionButton;
import com.google.android.material.snackbar.Snackbar;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;

import android.view.View;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {
    public static final String EXTRA_TEXT = "com.example.bike.EXTRA_TEXT";
    public static final String EXTRA_TEXT2 = "com.example.bike.EXTRA_TEXT2";
    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        
        Button button = (Button) findViewById(R.id.button);
        final EditText editText1 = (EditText) findViewById(R.id.edittxt1);
        final EditText editText2 = (EditText) findViewById(R.id.edittxt2);

        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (isEmpty(editText1)) {
                    Toast.makeText(getApplicationContext(), "Please enter full name", Toast.LENGTH_SHORT).show();
                    return;
                }
                if(isEmpty(editText2)){
                    Toast.makeText(getApplicationContext(), "Please enter circumference of wheel in mm", Toast.LENGTH_SHORT).show();
                    return;
                }


                openActivity2();
            }
        });
    }

    public boolean isEmpty(EditText etText) {
        if (etText.getText().toString().trim().length() > 0)
            return false;

        return true;
    }

    public void openActivity2() {
        EditText editText1 = (EditText) findViewById(R.id.edittxt1);
        String text = editText1.getText().toString();

        EditText editText2 = (EditText) findViewById(R.id.edittxt2);
        String text2 = editText2.getText().toString();

        TextView textView = (TextView) findViewById(R.id.txtview1) ;
        textView.setText("Interactive Bike Computer");


        Intent intent = new Intent(this, ActivityTwo.class);
        intent.putExtra(EXTRA_TEXT, text);
        intent.putExtra(EXTRA_TEXT2, text2);
        startActivity(intent);
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }
}
