/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Fire;

import controller.ParentClass;
import javafx.scene.image.ImageView;

/**
 *
 * @author ADMIN
 */
public class Fire extends ParentClass{
    
    public Fire(double dx, double dy, int[][] map) {
        super(dx, dy, map);
    }

    @Override
    public void LoadImage(String s, ImageView image) {
        
    }

    @Override
    public void Destroy(ImageView image) {
        
    }
    
}
