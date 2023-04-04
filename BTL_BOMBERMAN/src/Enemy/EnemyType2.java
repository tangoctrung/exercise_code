/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Enemy;

import java.io.File;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;

/**
 *
 * @author ADMIN
 */
public class EnemyType2 extends Enemy {
    private int Movedanhdau;
    private ImageView ImageViewSprite;
    private ImageView image;
    public EnemyType2(double dx, double dy, int[][] map, ImageView image, ImageView ImageViewSprite, int Movedanhdau) {
        super(dx, dy, map);
        this.ImageViewSprite = ImageViewSprite;
        this.image = image;
        this.Movedanhdau = Movedanhdau;
    }
    
    public ImageView getImageViewSprite() {
        return this.ImageViewSprite;
    }
    public void setImageViewSprite(ImageView ImageViewSprite) {
        this.ImageViewSprite = ImageViewSprite;
    }
    
    public ImageView getimage() {
        return this.image;
    }
    
    public void setimage(ImageView image) {
        this.image = image;
    }
    public int getMovedanhdau() {
        return this.Movedanhdau;
    }
    public void setMovedanhdau(int Movedanhdau) {
        this.Movedanhdau = Movedanhdau;
    }
    @Override 
    public void Move() {
          double x = image.getLayoutX();
          double y = image.getLayoutY();
          double x1 = ImageViewSprite.getLayoutX();
          double y1 = ImageViewSprite.getLayoutY();
          int i = (int) y / 45 + 1;
          int j = (int) x / 45 + 1;
          // xu li X
          if (this.Movedanhdau == 0) {
              if (x < x1 - 8) {
                  if (map[i][j + 1] == 0) {
                      image.setLayoutX(image.getLayoutX() + 45);
                  }
              }
              
              if (x > x1 - 8) {
                  if (map[i][j - 1] == 0) {
                      image.setLayoutX(image.getLayoutX() - 45);
                  }
              }
              
              if (x == x1 - 8 || map[i][j - 1] != 0 || map[i][j + 1] != 0) {
                  this.Movedanhdau = 1;
              }
          }
          // xu li Y
          if (this.Movedanhdau == 1) {
                if (y < y1) {
                  if (map[i + 1][j] == 0) {
                      image.setLayoutY(image.getLayoutY() + 45);
                  }
                }
              
              if (y > y1) {
                  if (map[i - 1][j] == 0) {
                      image.setLayoutY(image.getLayoutY() - 45);
                  }
              }
              
              if (y == y1 || map[i - 1][j] != 0 || map[i + 1][j] != 0) {
                  this.Movedanhdau = 0;
              }
          }
    }

}
