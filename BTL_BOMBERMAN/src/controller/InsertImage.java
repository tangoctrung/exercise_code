/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package controller;

import java.io.File;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;

/**
 *
 * @author ADMIN
 */
public class InsertImage {
       
      public void insertimage(String s, ImageView background) {
         File file = new File(s);
         Image image = new Image(file.toURI().toString());
         background.setImage(image);
      }
           
}
