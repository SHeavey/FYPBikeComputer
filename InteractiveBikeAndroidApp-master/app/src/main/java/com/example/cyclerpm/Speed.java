package com.example.cyclerpm;
//communicating with database
//calling functions to get data from db
//setters & getters
public class Speed {

        int _id;
        String _speed;
        String _time;
        public Speed(){   }
        public Speed(int id, String speed, String _time){
            this._id = id;
            this._speed = speed;
            this._time = _time;
        }



        public Speed(String speed, String _time){
            this._speed = speed;
            this._time = _time;
        }


        public int getID(){
            return this._id;
        }

        public void setID(int id){
            this._id = id;
        }

        public String getSpeed(){
            return this._speed;
        }

        public void setSpeed(String speed){
            this._speed = speed;
        }

        public String gettime(){
            return this._time;
        }

        public void settime(String time){
            this._time = time;
        }

}
