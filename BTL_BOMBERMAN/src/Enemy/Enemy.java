/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Enemy;

import controller.ParentClass;
import javafx.scene.image.ImageView;

/**
 *
 * @author ADMIN
 */
public abstract class Enemy extends ParentClass {
    
    public Enemy(double dx, double dy, double speedMove, double speedRotate, int map[][]) {
        super(dx, dy, speedMove, speedRotate, map);  
      
    }      
    

    public Enemy(double dx, double dy, int map[][]) {
        super(dx, dy, map);      
       
    }
    
    public abstract void Move();
    

    @Override
    public void LoadImage(String s, ImageView image1) {
         insertimage(s, image1);
    }
    
    
    public boolean vacham(ImageView image1, ImageView image2) {
         if (image1.getOpacity() == 1 && image2.getOpacity() == 1) {                  
                    double x1 = image1.getLayoutX();
                    double y1 = image1.getLayoutY();
                    double h1 = image1.getFitHeight();
                    double w1 = image1.getFitWidth();
                    double x2 = image2.getLayoutX();
                    double y2 = image2.getLayoutY();
                    double h2 = image2.getFitHeight();
                    double w2 = image2.getFitWidth();
                     
                    if (x2 + w2 - 8 >= x1 && x1 + w1 - 8 >= x2) {
                        if (y2 + h2 - 2 >= y1 && y1 + h1 - 2 >= y2) {
                            return true;
                        }
                    }
                    if (y2 == y1) {
                        if (x2 + w2 - 8 >= x1 && x1 + w1 - 8 >= x2) {
                            return true;
                        }
                    }
                    return false;
               }
           return false;
    }
    
    @Override
    public void Destroy(ImageView image1) {
        image1.setOpacity(0);
    }
    
}
