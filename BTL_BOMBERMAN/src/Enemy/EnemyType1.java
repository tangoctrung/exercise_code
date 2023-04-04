/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Enemy;

import javafx.scene.image.ImageView;

/**
 *
 * @author ADMIN
 */
public class EnemyType1 extends Enemy {

    protected int MoveType;
    protected double Angel;
    private boolean isPlaygame;

    public boolean isIsPlaygame() {
        return isPlaygame;
    }

    public void setIsPlaygame(boolean isPlaygame) {
        this.isPlaygame = isPlaygame;
    }
    //private int[][] getMap;
   private ImageView image;
    
    public EnemyType1(double dx, double dy, double speedMove, double speedRotate, int[][] map, ImageView image, int MoveTye, double Angel) {
        super(dx, dy, speedMove, speedRotate, map);
        this.MoveType = MoveTye;
        this.image = image;
        this.Angel = Angel;
    }
    @Override
   public ImageView getimage() {
        return this.image;
    }
    
    @Override
    public void setimage(ImageView image) {
        this.image = image;
    }
 
    public int getMoveType() {
        return this.MoveType;
    }
    public void setMoveType(int MoveType) {
        this.MoveType = MoveType;
    
    }
    public double getAngel() {
        return this.Angel;
    }
    public void setAngel(double Angel) {
        this.Angel = Angel;
    }
    
    @Override
    public void Move() {
         if (this.MoveType == 1 && isPlaygame) {   // 1 LA DI CHUYEN NGANG
             this.setAngel(this.getAngel() + super.getSpeedRotate());
              image.setRotate(this.getAngel());              
             double x3 = image.getLayoutX();
             double y3 = image.getLayoutY();
             image.setLayoutX(x3 + super.getSpeedMove());           
             if ((int) image.getLayoutX() % 45 == 0) {
                 int j3 = (int) image.getLayoutX() / 45 + 1;
                 int i3 = (int) image.getLayoutY() / 45 + 1;
                
                 if (map[i3][j3 + 1] != 0 || map[i3][j3 - 1] != 0){
                     this.setSpeedMove(-super.getSpeedMove()); 
                     this.setSpeedRotate(-super.getSpeedRotate());
                 }
              }
         } else if (this.MoveType == 2 && isPlaygame) {   // 2 LA DI CHUYEN DOC
             this.setAngel(this.getAngel() + super.getSpeedRotate());
             image.setRotate(this.getAngel());
             double x2 = image.getLayoutX();
             double y2 = image.getLayoutY();
             image.setLayoutY(y2 + super.getSpeedMove());           
             if ((int) image.getLayoutY() % 45 == 0) {
                 int j2 = (int) image.getLayoutX() / 45 + 1;
                 int i2 = (int) image.getLayoutY() / 45 + 1;
                
                 if (map[i2 + 1][j2] != 0 || map[i2 - 1][j2] != 0){
                     this.setSpeedMove(-super.getSpeedMove()); 
                     this.setSpeedRotate(-super.getSpeedRotate());
                 }
             }
         } else if (this.MoveType == 3 && isPlaygame) { // 3 LA DI CHUYEN RANDOM
             double x3 = image.getLayoutX();
             double y3 = image.getLayoutY();
             image.setLayoutX(x3 + super.getSpeedMove());
             if ((int) image.getLayoutX() % 45 == 0) {
                 int j3 = (int) image.getLayoutX() / 45 + 1;
                 int i3 = (int) image.getLayoutY() / 45 + 1;                
                 if (map[i3][j3 + 1] != 0 || map[i3][j3 - 1] != 0){
                     this.setSpeedMove(-super.getSpeedMove());                   
                 }
              }
         }
    }

  
    
}
