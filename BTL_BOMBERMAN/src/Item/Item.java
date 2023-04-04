/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Item;

import controller.ParentClass;
import javafx.scene.image.ImageView;

/**
 *
 * @author ADMIN
 */
public class Item extends ParentClass {
    private final ImageView ImageViewItem;
    public Item(double dx, double dy, int map[][], ImageView ImageViewItem) {
        super(dx, dy, map);
        this.ImageViewItem = ImageViewItem;
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
