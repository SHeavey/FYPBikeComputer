package com.example.cyclerpm;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

import java.util.ArrayList;
import java.util.List;

public class DBHelper extends SQLiteOpenHelper { //databasehelper example

        private static final int DATABASE_VERSION = 2; //changed database version to clear graph as was getting over populated
        private static final String DATABASE_NAME = "speedManager";
        private static final String TABLE_CONTACTS = "speed";
        private static final String KEY_ID = "id";
        private static final String KEY_SPEED = "speed";
        private static final String KEY_TIME = "time";

        public DBHelper(Context context) {//constructor
            super(context, DATABASE_NAME, null, DATABASE_VERSION);
        }

        // Creating Tables
        @Override
        public void onCreate(SQLiteDatabase db) {
            String CREATE_CONTACTS_TABLE = "CREATE TABLE " + TABLE_CONTACTS + "("
                    + KEY_ID + " INTEGER PRIMARY KEY," + KEY_SPEED + " TEXT,"
                    + KEY_TIME + " TEXT" + ")";
            db.execSQL(CREATE_CONTACTS_TABLE);
        }

        // Upgrading database
        @Override
        public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
            // Drop older table if existed
            db.execSQL("DROP TABLE IF EXISTS " + TABLE_CONTACTS);

            // Create tables again
            onCreate(db);
        }

        // code to add the new contact
        void addContact(Speed contact) {
            SQLiteDatabase db = this.getWritableDatabase();

            ContentValues values = new ContentValues();
            values.put(KEY_SPEED, contact.getSpeed()); // Contact Speed
            values.put(KEY_TIME, contact.gettime()); // Contact time

            // Inserting Row
            db.insert(TABLE_CONTACTS, null, values);
            //2nd argument is String containing nullColumnHack
            db.close(); // Closing database connection
        }

        // code to get the single contact
        Speed getContact(int id) {
            SQLiteDatabase db = this.getReadableDatabase();

            Cursor cursor = db.query(TABLE_CONTACTS, new String[] { KEY_ID,
                            KEY_SPEED, KEY_TIME }, KEY_ID + "=?",
                    new String[] { String.valueOf(id) }, null, null, null, null);
            if (cursor != null)
                cursor.moveToFirst();

            Speed contact = new Speed(Integer.parseInt(cursor.getString(0)),
                    cursor.getString(1), cursor.getString(2));
            // return contact
            return contact;
        }

        // code to get all contacts in a list view
        public List<Speed> getAllContacts() {
            List<Speed> contactList = new ArrayList<Speed>();
            // Select All Query
            String selectQuery = "SELECT  * FROM " + TABLE_CONTACTS;

            SQLiteDatabase db = this.getWritableDatabase();
            Cursor cursor = db.rawQuery(selectQuery, null);

            // looping through all rows and adding to list
            if (cursor.moveToFirst()) {
                do {
                    Speed contact = new Speed();
                    contact.setID(Integer.parseInt(cursor.getString(0)));
                    contact.setSpeed(cursor.getString(1));
                    contact.settime(cursor.getString(2));
                    // Adding contact to list
                    contactList.add(contact);
                } while (cursor.moveToNext());
            }

            // return contact list
            return contactList;
        }

        // code to update the single contact
        public int updateContact(Speed contact) {
            SQLiteDatabase db = this.getWritableDatabase();

            ContentValues values = new ContentValues();
            values.put(KEY_SPEED, contact.getSpeed());
            values.put(KEY_TIME, contact.gettime());

            // updating row
            return db.update(TABLE_CONTACTS, values, KEY_ID + " = ?",
                    new String[] { String.valueOf(contact.getID()) });
        }

        // Deleting single contact
        public void deleteContact(Speed contact) {
            SQLiteDatabase db = this.getWritableDatabase();
            db.delete(TABLE_CONTACTS, KEY_ID + " = ?",
                    new String[] { String.valueOf(contact.getID()) });
            db.close();
        }

        public int getContactsCount() {
            String countQuery = "SELECT  * FROM " + TABLE_CONTACTS;
            SQLiteDatabase db = this.getReadableDatabase();
            Cursor cursor = db.rawQuery(countQuery, null);
            cursor.close();

            // return count
            return cursor.getCount();
        }



}