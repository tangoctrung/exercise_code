/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package controller;

import javafx.scene.image.ImageView;

/**
 *
 * @author ADMIN
 */
public abstract class ParentClass extends InsertImage {
     protected double dx, dy;
     protected int map[][];
     protected ImageView image;
     protected double speedMove, speedRotate;  
     protected int KhoangCachNo;
     public ParentClass(double dx, double dy, double speedMove, double speedRotate, int map[][]) {
          this.dx = dx; this.dy = dy;
          this.speedMove = speedMove; this.speedRotate = speedRotate;    
          this.map = map;
     }
     
     public ParentClass(double dx, double dy, int map[][]) {
          this.dx = dx; this.dy = dy;
          this.map = map;
     }
     
     public ParentClass(double dx, double dy, int KhoangCachNo, int map[][]) {
         this.dx = dx;
         this.dy = dy;
         this.KhoangCachNo = KhoangCachNo;
         this.map = map;
     }
     public double getdx() {
         return this.dx;
     }
     public void setdx(double dx) {
         this.dx = dx;                
     }
     public int[][] getMap() {
         return this.map;
     }
     public void setMap(int[][] map) {
         this.map = map;
     }
     public double getdy() {
         return this.dy;
     }
     public void setdy(double dy) {
         this.dy = dy;                
     }
     public double getSpeedMove() {
         return this.speedMove;
     }
     public void setSpeedMove(double speedMove) {
         this.speedMove = speedMove;                
     }
     
     public double getSpeedRotate() {
         return this.speedRotate;
     }
     public void setSpeedRotate(double speedRotate) {
         this.speedRotate = speedRotate;                
     }        
     
     public double getKhoangCachNo() {
         return this.KhoangCachNo;
     }
     public void setKhoangCachNo(int KhoangCachNo) {
         this.KhoangCachNo = KhoangCachNo;                
     }   
     public ImageView getimage() {
        return this.image;
    }
     public void setimage(ImageView image) {
      this.image = image;
    }
     public abstract void LoadImage(String s, ImageView image);
     public abstract void Destroy(ImageView image);
         
}
