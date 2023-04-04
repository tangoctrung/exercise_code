/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Box;

import controller.ParentClass;
import javafx.scene.image.ImageView;

/**
 *
 * @author ADMIN
 */
public class Box extends ParentClass{
   private ImageView image;

    public ImageView getImage() {
        return image;
    }

    public void setImage(ImageView image) {
        this.image = image;
    }
   
   
    public Box(double dx, double dy, int[][] map) {
        super(dx, dy, map);
    }

    @Override
    public void LoadImage(String s, ImageView image) {
        insertimage(s, image);
    }

    @Override
    public void Destroy(ImageView image) {
        image.setOpacity(0);
    }
    
}
