/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Sprite;

import controller.ParentClass;
import controller.PlaySound;
import javafx.animation.AnimationTimer;
import javafx.scene.image.ImageView;
import javafx.scene.layout.Pane;

/**
 *
 * @author ADMIN
 */
public class Sprite extends ParentClass {
    private final PlaySound play = new PlaySound();
    private ImageView ImageViewSprite;
    private int danhdauMove = 0, fps;
    private Pane PaneBackGround;
    private int level;
    public Sprite(double dx, double dy, int map[][], ImageView ImageViewSprite, int fps, Pane PaneBackGround) {
        super(dx, dy, map);
        this.ImageViewSprite = ImageViewSprite;
        this.fps = fps;
        this.PaneBackGround = PaneBackGround;
    }

    public int getLevel() {
        return level;
    }

    public void setLevel(int level) {
        this.level = level;
    }
    
    public ImageView getImageView() {
        return this.ImageViewSprite;
    }
    public void setImageViewSprite(ImageView ImageViewSprite) {
        this.ImageViewSprite = ImageViewSprite;
    }
    public int getfps() {
        return this.fps;
    }
    public Pane getPaneBackGround() {
        return this.PaneBackGround;
    }
    public void setPaneBackGround(Pane PaneBackGround) {
        this.PaneBackGround = PaneBackGround;
    }
    public void setfps(int fps) {
        this.fps = fps;
    }
    public void MoveUp() {
          double a = ImageViewSprite.getLayoutX();
          double b = ImageViewSprite.getLayoutY();
          int y = (int) ImageViewSprite.getLayoutY();
          int x = (int) ImageViewSprite.getLayoutX();
          int i1 =(int) (y) / 45 + 1;
          int j1 =(int) (x - 8) / 45 + 1;      
          if (danhdauMove == 0 && y >= 90 && (map[i1 - 1][j1] == 0 || map[i1-1][j1] == 4)) {       
                 danhdauMove = 1;
                 AnimationSpriteUp aniUP = new AnimationSpriteUp();
                  aniUP.start();                  
          }
    }
    
    public void MoveDown() {
        double a = ImageViewSprite.getLayoutX();
          double b = ImageViewSprite.getLayoutY();
          int y = (int) ImageViewSprite.getLayoutY();
          int x = (int) ImageViewSprite.getLayoutX();
          int i1 =(int) (y) / 45 + 1;
          int j1 =(int) (x - 8) / 45 + 1;         
          if (danhdauMove == 0 && y <= 455 && (map[i1+1][j1] == 0 || map[i1 + 1][j1] == 4)) {
                 AnimationSpriteDown aniDOWN = new AnimationSpriteDown();
                 aniDOWN.start();
                 danhdauMove = 1;
          }
    }
    
    public void MoveLeft() {
         double a = ImageViewSprite.getLayoutX();
          double b = ImageViewSprite.getLayoutY();
          int y = (int) ImageViewSprite.getLayoutY();
          int x = (int) ImageViewSprite.getLayoutX();
          int i1 =(int) (y) / 45 + 1;
          int j1 =(int) (x - 8)/45 + 1;        
          if (danhdauMove == 0 && x >= 90 && (map[i1][j1-1] == 0 || map[i1][j1 - 1] == 4)) {
                 AnimationSpriteLeft aniLEFT = new AnimationSpriteLeft();
                 aniLEFT.start();
                 danhdauMove = 1;
          }
          
    }  
    
    public void MoveRight() {
        double a = ImageViewSprite.getLayoutX();
          double b = ImageViewSprite.getLayoutY();
          int y = (int) ImageViewSprite.getLayoutY();
          int x = (int) ImageViewSprite.getLayoutX();
          int i1 =(int) (y) / 45 + 1;
          int j1 =(int) (x - 8) / 45 + 1;        
          if (danhdauMove == 0 && x <= 1268 && (map[i1][j1+1] == 0 || map[i1][j1 + 1] == 4)) {
                 AnimationSpriteRight aniRIGHT = new AnimationSpriteRight();
                 aniRIGHT.start();   
                 danhdauMove = 1;
          }
                
    }
    
    @Override
    public void LoadImage(String s, ImageView image) {
        insertimage(s, image);
    }

    @Override
    public void Destroy(ImageView image) {
        image.setOpacity(0);
    }

    public class AnimationSpriteUp extends AnimationTimer {
        int dem = 0; 
        @Override
        public void handle(long now) {
            dem ++;
            if (dem <= fps / 6) {
                insertimage("IMAGE/sprite/up1.png", ImageViewSprite);
             }
             if (dem <= fps / 3 && dem > fps / 6) {
                insertimage("IMAGE/sprite/up2.png", ImageViewSprite);
             }
             if (dem <= fps / 2 && dem > fps / 3) {
                insertimage("IMAGE/sprite/up3.png", ImageViewSprite);
             }
             if (dem <= fps * 2 / 3 && dem > fps / 2) {
                insertimage("IMAGE/sprite/up4.png", ImageViewSprite);
             }
             if (dem <= fps * 5 / 6 && dem > fps * 2 / 3) {
                insertimage("IMAGE/sprite/up5.png", ImageViewSprite);
             }
             if (dem <= fps && dem > fps * 5 / 6) {
                insertimage("IMAGE/sprite/up6.png", ImageViewSprite);
             }
             ImageViewSprite.setLayoutY(ImageViewSprite.getLayoutY() - 45.0 / fps); 
            
             if (dem == fps) {
                 danhdauMove = 0;
                 stop();
             }
        }
        
    }
    public class AnimationSpriteDown extends AnimationTimer {
        int dem = 0; 
        @Override
        public void handle(long now) {
            dem ++;
            if (dem <= fps / 6) {
                insertimage("IMAGE/sprite/down1.png", ImageViewSprite);
             }
             if (dem <= fps / 3 && dem > fps / 6) {
                insertimage("IMAGE/sprite/down2.png", ImageViewSprite);
             }
             if (dem <= fps / 2 && dem > fps / 3) {
                insertimage("IMAGE/sprite/down3.png", ImageViewSprite);
             }
             if (dem <= fps * 2 / 3 && dem > fps / 2) {
                insertimage("IMAGE/sprite/down4.png", ImageViewSprite);
             }
             if (dem <= fps * 5 / 6 && dem > fps * 2 / 3) {
                insertimage("IMAGE/sprite/down5.png", ImageViewSprite);
             }
             if (dem <= fps && dem > fps * 5 / 6) {
                insertimage("IMAGE/sprite/down6.png", ImageViewSprite);
             }
             ImageViewSprite.setLayoutY(ImageViewSprite.getLayoutY() + 45.0 / fps); 
             
             if (dem == fps) {
                 danhdauMove = 0;
                 stop();
             }
        }
        
    }
    public class AnimationSpriteLeft extends AnimationTimer {
        int dem = 0; 
        @Override
        public void handle(long now) {
            dem ++;
            if (dem <= fps / 6) {
                insertimage("IMAGE/sprite/left1.png", ImageViewSprite);
             }
             if (dem <= fps / 3 && dem > fps / 6) {
                insertimage("IMAGE/sprite/left2.png", ImageViewSprite);
             }
             if (dem <= fps / 2 && dem > fps / 3) {
                insertimage("IMAGE/sprite/left3.png", ImageViewSprite);
             }
             if (dem <= fps * 2 / 3 && dem > fps / 2) {
                insertimage("IMAGE/sprite/left4.png", ImageViewSprite);
             }
             if (dem <= fps * 5 / 6 && dem > fps * 2 / 3) {
                insertimage("IMAGE/sprite/left5.png", ImageViewSprite);
             }
             if (dem <= fps && dem > fps * 5 / 6) {
                insertimage("IMAGE/sprite/left6.png", ImageViewSprite);
             }
             ImageViewSprite.setLayoutX(ImageViewSprite.getLayoutX() - 45.0 / fps); 
             
             if (level == 2 && ImageViewSprite.getLayoutX() < 810  &&  ImageViewSprite.getLayoutX() >= 323) {
                 PaneBackGround.setLayoutX(PaneBackGround.getLayoutX() + 45.0 / fps);
             }
             if (dem == fps) {
                 danhdauMove = 0;
                 stop();
             }
        }
        
    }
    public class AnimationSpriteRight extends AnimationTimer {
        int dem = 0; 
        @Override
        public void handle(long now) {
            dem ++;
            if (dem <= fps / 6) {
                insertimage("IMAGE/sprite/right1.png", ImageViewSprite);
             }
             if (dem <= fps / 3 && dem > fps / 6) {
                insertimage("IMAGE/sprite/right2.png", ImageViewSprite);
             }
             if (dem <= fps / 2 && dem > fps / 3) {
                insertimage("IMAGE/sprite/right3.png", ImageViewSprite);
             }
             if (dem <= fps * 2 / 3 && dem > fps / 2) {
                insertimage("IMAGE/sprite/right4.png", ImageViewSprite);
             }
             if (dem <= fps * 5 / 6 && dem > fps * 2 / 3) {
                insertimage("IMAGE/sprite/right5.png", ImageViewSprite);
             }
             if (dem <= fps && dem > fps * 5 / 6) {
                insertimage("IMAGE/sprite/right6.png", ImageViewSprite);
             }
             ImageViewSprite.setLayoutX(ImageViewSprite.getLayoutX() + 45.0 / fps);              
             
             if (level == 2 && ImageViewSprite.getLayoutX() < 810  &&  ImageViewSprite.getLayoutX() >= 323) {
                 PaneBackGround.setLayoutX(PaneBackGround.getLayoutX() - 45.0 / fps);
             } 
             if (dem == fps) {
                 danhdauMove = 0;
                 stop();
             }
        }
        
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
    
}
