/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Boom_Fire;

import controller.ParentClass;
import controller.PlaySound;
import javafx.animation.AnimationTimer;
import javafx.scene.control.Button;
import javafx.scene.image.ImageView;
import javafx.scene.layout.Pane;
import javafx.scene.text.Text;

/**
 *
 * @author ADMIN
 */
public class Boom extends ParentClass{
    private ImageView ImageViewBom, ImageViewSprite;
    private ImageView ImageViewFireCenter, ImageViewFireLeft1, ImageViewFireRight1, ImageViewFireUp1, ImageViewFireDown1;
    private ImageView ImageViewFireLeft2, ImageViewFireRight2, ImageViewFireUp2, ImageViewFireDown2;
    private ImageView[][] ImageViewMap = new ImageView[15][33];   
    private ImageView[] ArrImageViewRock = new ImageView[10];
    private ImageView[] ArrImageViewFire1 = new ImageView[9];
    private int MonterNumber, level;
    private Pane PaneResult;
    private Text TextResult;
    private boolean isPlaygame;  
    private int BoomNumber, dBoomNumber;
    int sizeArrImageViewRock;

    public int getLevel() {
        return level;
    }

    public void setLevel(int level) {
        this.level = level;
    }
    
    
    private Button ButtonPlayAgain, ButtonExit, ButtonLevel2;

    public Button getButtonLevel2() {
        return ButtonLevel2;
    }

    public void setButtonLevel2(Button ButtonLevel2) {
        this.ButtonLevel2 = ButtonLevel2;
    }

    public Button getButtonPlayAgain() {
        return ButtonPlayAgain;
    }

    public void setButtonPlayAgain(Button ButtonPlayAgain) {
        this.ButtonPlayAgain = ButtonPlayAgain;
    }

    public Button getButtonExit() {
        return ButtonExit;
    }

    public void setButtonExit(Button ButtonExit) {
        this.ButtonExit = ButtonExit;
    }

    
    public int getSizeArrImageViewRock() {
        return sizeArrImageViewRock;
    }

    public void setSizeArrImageViewRock(int sizeArrImageViewRock) {
        this.sizeArrImageViewRock = sizeArrImageViewRock;
    }

    public int getSizeArrImageViewFire1() {
        return sizeArrImageViewFire1;
    }

    public void setSizeArrImageViewFire1(int sizeArrImageViewFire1) {
        this.sizeArrImageViewFire1 = sizeArrImageViewFire1;
    }
    int sizeArrImageViewFire1;
    public int getBoomNumber() {
        return BoomNumber;
    }
    public void setBoomNumber(int BoomNumber) {
        this.BoomNumber = BoomNumber;
    }
    public int getdBoomNumber() {
        return dBoomNumber;
    }
    public void setdBoomNumber(int dBoomNumber) {
        this.dBoomNumber = dBoomNumber;
    }
    public ImageView[] getArrImageViewFire1() {
        return ArrImageViewFire1;
    }
    public void setArrImageViewFire1(ImageView[] ArrImageViewFire1) {
        this.ArrImageViewFire1 = ArrImageViewFire1;
    }  
    public boolean isIsPlaygame() {
        return isPlaygame;
    }
    public void setIsPlaygame(boolean isPlaygame) {
        this.isPlaygame = isPlaygame;
    }   
    public Pane getPaneResult() {
        return PaneResult;
    }
    public void setPaneResult(Pane PaneResult) {
        this.PaneResult = PaneResult;
    }
    public Text getTextResult() {
        return TextResult;
    }
    public void setTextResult(Text TextResult) {
        this.TextResult = TextResult;
    }
    public ImageView[][] getImageViewMap() {
        return ImageViewMap;
    }
    public void setImageViewMap(ImageView[][] ImageViewMap) {
        this.ImageViewMap = ImageViewMap;
    }
    public ImageView[] getArrImageViewRock() {
        return ArrImageViewRock;
    }
    public void setArrImageViewRock(ImageView[] ArrImageViewRock) {
        this.ArrImageViewRock = ArrImageViewRock;
    }  
    public ImageView getImageViewFireCenter() {
        return ImageViewFireCenter;
    }
    public void setImageViewFireCenter(ImageView ImageViewFireCenter) {
        this.ImageViewFireCenter = ImageViewFireCenter;
    }
    public ImageView getImageViewFireLeft1() {
        return ImageViewFireLeft1;
    }
    public void setImageViewFireLeft1(ImageView ImageViewFireLeft1) {
        this.ImageViewFireLeft1 = ImageViewFireLeft1;
    }
    public ImageView getImageViewFireRight1() {
        return ImageViewFireRight1;
    }
    public void setImageViewFireRight1(ImageView ImageViewFireRight1) {
        this.ImageViewFireRight1 = ImageViewFireRight1;
    }
    public ImageView getImageViewFireUp1() {
        return ImageViewFireUp1;
    }
    public void setImageViewFireUp1(ImageView ImageViewFireUp1) {
        this.ImageViewFireUp1 = ImageViewFireUp1;
    }
    public ImageView getImageViewFireDown1() {
        return ImageViewFireDown1;
    }
    public void setImageViewFireDown1(ImageView ImageViewFireDown1) {
        this.ImageViewFireDown1 = ImageViewFireDown1;
    }
    public ImageView getImageViewFireLeft2() {
        return ImageViewFireLeft2;
    }
    public void setImageViewFireLeft2(ImageView ImageViewFireLeft2) {
        this.ImageViewFireLeft2 = ImageViewFireLeft2;
    }
    public ImageView getImageViewFireRight2() {
        return ImageViewFireRight2;
    }
    public void setImageViewFireRight2(ImageView ImageViewFireRight2) {
        this.ImageViewFireRight2 = ImageViewFireRight2;
    }
    public ImageView getImageViewFireUp2() {
        return ImageViewFireUp2;
    }
    public void setImageViewFireUp2(ImageView ImageViewFireUp2) {
        this.ImageViewFireUp2 = ImageViewFireUp2;
    }
    public ImageView getImageViewFireDown2() {
        return ImageViewFireDown2;
    }
    public void setImageViewFireDown2(ImageView ImageViewFireDown2) {
        this.ImageViewFireDown2 = ImageViewFireDown2;
    }
    public int getMonterNumber() {
        return MonterNumber;
    }
    public void setMonterNumber(int MonterNumber) {
        this.MonterNumber = MonterNumber;
    }

    
    
    public void initImageViewFire() {
        
            ImageViewFireCenter.setOpacity(1);
            ImageViewFireUp1.setOpacity(1);
            ImageViewFireDown1.setOpacity(1);
            ImageViewFireLeft1.setOpacity(1);
            ImageViewFireRight1.setOpacity(1);
            LoadImage("IMAGE/fire_center.png", ImageViewFireCenter);
            LoadImage("IMAGE/fire_u_d.png", ImageViewFireUp1);
            LoadImage("IMAGE/fire_r_l.png", ImageViewFireLeft1);
            LoadImage("IMAGE/fire_r_l.png", ImageViewFireRight1);
            LoadImage("IMAGE/fire_u_d.png", ImageViewFireDown1);
            double x = ImageViewFireCenter.getLayoutX();
            double y = ImageViewFireCenter.getLayoutY();
            ImageViewFireUp1.setLayoutX(x);  ImageViewFireUp1.setLayoutY(y - 45);
            ImageViewFireDown1.setLayoutX(x); ImageViewFireDown1.setLayoutY(y + 45);
            ImageViewFireLeft1.setLayoutX(x - 45); ImageViewFireLeft1.setLayoutY(y);
            ImageViewFireRight1.setLayoutX(x + 45); ImageViewFireRight1.setLayoutY(y);
         if (KhoangCachNo == 2) {           
            ImageViewFireUp2.setOpacity(1);
            ImageViewFireDown2.setOpacity(1);
            ImageViewFireLeft2.setOpacity(1);
            ImageViewFireRight2.setOpacity(1);
            LoadImage("IMAGE/fire_u_d.png", ImageViewFireUp2);
            LoadImage("IMAGE/fire_r_l.png", ImageViewFireLeft2);
            LoadImage("IMAGE/fire_r_l.png", ImageViewFireRight2);
            LoadImage("IMAGE/fire_u_d.png", ImageViewFireDown2);          
            
            ImageViewFireUp2.setLayoutX(x); ImageViewFireUp2.setLayoutY(y - 90);
            ImageViewFireDown2.setLayoutX(x); ImageViewFireDown2.setLayoutY(y + 90);
            ImageViewFireLeft2.setLayoutX(x - 90); ImageViewFireLeft2.setLayoutY(y);
            ImageViewFireRight2.setLayoutX(x + 90); ImageViewFireRight2.setLayoutY(y);            
        }
    }
    
    public void destroyImageViewFire() {        
        ImageViewFireCenter.setOpacity(0);        
        ImageViewFireUp1.setOpacity(0);
        ImageViewFireDown1.setOpacity(0);
        ImageViewFireLeft1.setOpacity(0);
        ImageViewFireRight1.setOpacity(0);
        if (KhoangCachNo == 2) {
            ImageViewFireUp2.setOpacity(0);
            ImageViewFireDown2.setOpacity(0);
            ImageViewFireLeft2.setOpacity(0);
            ImageViewFireRight2.setOpacity(0);
        }
    } 
    
    public Boom(double dx, double dy, int KhoangCachNo, int map[][]) {
         super(dx, dy, KhoangCachNo, map);
    }
    public ImageView getImageViewBom() {
        return this.ImageViewBom;
    }
    public void setImageViewBom(ImageView ImageViewBom) {
        this.ImageViewBom = ImageViewBom;
    }
    public ImageView getImageViewSprite() {
        return this.ImageViewSprite;
    }
    public void setImageViewSprite(ImageView ImageViewSprite) {
        this.ImageViewSprite = ImageViewSprite;
    }
    @Override
    public void LoadImage(String s, ImageView image) {
        insertimage(s, image);
       
    }

    @Override
    public void Destroy(ImageView image) {
        image.setOpacity(0);
    }
    
    public void AniBom() {
        ImageViewBom.setOpacity(1);
        AnimationBom aniBom = new AnimationBom();
        aniBom.start();
        ImageViewBom.setLayoutX(ImageViewSprite.getLayoutX() - 8);
        ImageViewBom.setLayoutY(ImageViewSprite.getLayoutY());                 
        int y = (int) ImageViewSprite.getLayoutY();
        int x = (int) ImageViewSprite.getLayoutX();
        int i1 =(int) (y) / 45 + 1;
        int j1 =(int) (x - 8) / 45 + 1;
        map[i1][j1] = 3;
    }
    public class AnimationBom extends AnimationTimer {
       public int CountTimeBoom = 0;
       public int x,y,i1,j1,di1,dj1,dx1,dy1;
        @Override
        public void handle(long now) {
            // TIME WAIT BOM NO
            if (isPlaygame) {
                if(CountTimeBoom < 150) {
                    if (CountTimeBoom % 25 == 0 && (CountTimeBoom / 25) % 3 == 0) {
                        LoadImage("IMAGE/bom/bom2.png", ImageViewBom);
                    }
                    if (CountTimeBoom % 25 == 0 && (CountTimeBoom / 25) % 3 == 1) {
                        LoadImage("IMAGE/bom/bom1.png", ImageViewBom);
                    }
                    if (CountTimeBoom % 25 == 0 && (CountTimeBoom / 25) % 3 == 2) {
                        LoadImage("IMAGE/bom/bom.png", ImageViewBom);
                    }
                 
                }
                CountTimeBoom += 1;
                if (CountTimeBoom == 150) {
                    String s = "sound/BOM_11_M.wav";
                    playsound.PlayMusic(s);
                    Destroy(ImageViewBom);
                    dBoomNumber--;
                    int y = (int) ImageViewBom.getLayoutY();
                    int x = (int) ImageViewBom.getLayoutX();
                    int i1 =(int) (y) / 45 + 1;
                    int j1 =(int) (x) / 45 + 1;
                    map[i1][j1] = 0;   
                    ImageViewFireCenter.setLayoutX(ImageViewBom.getLayoutX());
                    ImageViewFireCenter.setLayoutY(ImageViewBom.getLayoutY());  
                    int dx1 = (int) ImageViewFireCenter.getLayoutX();
                    int dy1 = (int) ImageViewFireCenter.getLayoutY();
                    int di1 = dy1 / 45 + 1; int dj1 = dx1 / 45 + 1;
                    if (KhoangCachNo == 1) {
                        // 4 LA CO FIRE
                        if (map[di1 + 1][dj1] == 0)  map[di1 + 1][dj1] = 4; if (map[di1 - 1][dj1] == 0)  map[di1 - 1][dj1] = 4;
                        if (map[di1][dj1 + 1] == 0)  map[di1][dj1 + 1] = 4; if (map[di1][dj1 - 1] == 0)  map[di1][dj1 - 1] = 4;
                        map[di1][dj1] = 4;
                        initImageViewFire();   
                        // SHOW FIRE
                        if (map[i1 - 1][j1] == 1) {
                            Destroy(ImageViewFireUp1);
                        }
                        if (map[i1 + 1][j1] == 1) {
                            Destroy(ImageViewFireDown1);
                        }
                        if (map[i1][j1 - 1] == 1) {
                            Destroy(ImageViewFireLeft1);
                        }
                        if (map[i1][j1 + 1] == 1) {
                            Destroy(ImageViewFireRight1);
                        }
                    } else if (KhoangCachNo == 2 && level == 2) {
                        // 4 LA CO FIRE
                        if (map[di1 + 1][dj1] == 0)  map[di1 + 1][dj1] = 4; if (map[di1 - 1][dj1] == 0)  map[di1 - 1][dj1] = 4;
                        if (map[di1][dj1 + 1] == 0)  map[di1][dj1 + 1] = 4; if (map[di1][dj1 - 1] == 0)  map[di1][dj1 - 1] = 4;
                        if (map[di1 + 2][dj1] == 0)  map[di1 + 2][dj1] = 4; if (map[di1 - 2][dj1] == 0)  map[di1 - 2][dj1] = 4;
                        if (map[di1][dj1 + 2] == 0)  map[di1][dj1 + 2] = 4; if (map[di1][dj1 - 2] == 0)  map[di1][dj1 - 2] = 4;
                        map[di1][dj1] = 4;
                        initImageViewFire();      
                        // SHOW FIRE
                        if (map[i1 - 1][j1] == 1) {
                            ImageViewFireUp2.setOpacity(0);
                            ImageViewFireUp1.setOpacity(0);
                            if (map[i1 - 2][j1] == 4) map[i1 - 2][j1] = 0;
                        }
                        if (map[i1 + 1][j1] == 1) {
                            ImageViewFireDown2.setOpacity(0);
                            ImageViewFireDown1.setOpacity(0);
                            if (map[i1 + 2][j1] == 4) map[i1 + 2][j1] = 0;
                        }
                        if (map[i1][j1 - 1] == 1) {
                            ImageViewFireLeft2.setOpacity(0);
                            ImageViewFireLeft1.setOpacity(0);
                            if (map[i1][j1 - 2] == 4) map[i1][j1 - 2] = 0;
                        }
                        if (map[i1][j1 + 1] == 1) {
                            ImageViewFireRight2.setOpacity(0);
                            ImageViewFireRight1.setOpacity(0);
                            if (map[i1][j1 + 2] == 4) map[i1][j1 + 2] = 0;
                        }   
                        if (map[i1 - 2][j1] == 1) { ImageViewFireUp2.setOpacity(0); }
                        if (map[i1 + 2][j1] == 1) { ImageViewFireDown2.setOpacity(0); }
                        if (map[i1][j1 - 2] == 1) { ImageViewFireLeft2.setOpacity(0); }
                        if (map[i1][j1 + 2] == 1) { ImageViewFireRight2.setOpacity(0); }   
                        if (map[i1 - 1][j1] == 2) { ImageViewFireUp2.setOpacity(0); }
                        if (map[i1 + 1][j1] == 2) { ImageViewFireDown2.setOpacity(0); }
                        if (map[i1][j1 - 1] == 2) { ImageViewFireLeft2.setOpacity(0); }
                        if (map[i1][j1 + 1] == 2) { ImageViewFireRight2.setOpacity(0); }   
                    }
                    
                    // XU LI VA CHAM CUA FIRE VOI NHAN VAT                  
                   int dx =(int) ImageViewSprite.getLayoutX();
                   int dy =(int) ImageViewSprite.getLayoutY();
                   int i = (dy) / 45 + 1; int j = (dx - 8) / 45 + 1;
                   if (map[i][j] == 4) {  
                        isPlaygame = false;
                        ImageViewSprite.setOpacity(0.5);
                        endgame();                     
                   }
                   // XU LI VA CHAM CUA FIRE VOI BOX
                   dx1 = (int) ImageViewFireCenter.getLayoutX();
                   dy1 = (int) ImageViewFireCenter.getLayoutY();
                   di1 = dy1 / 45 + 1; dj1 = dx1 / 45 + 1;
                   if (KhoangCachNo == 1) {
                        if (map[di1 + 1][dj1] == 2)  {
                        map[di1 + 1][dj1] = 0;                      
                        ImageViewMap[di1 + 1][dj1].setOpacity(0);
                        } 
                        if (map[di1 - 1][dj1] == 2)  {
                            map[di1 - 1][dj1] = 0;
                            ImageViewMap[di1 - 1][dj1].setOpacity(0);
                        }
                        if (map[di1][dj1 + 1] == 2)  {
                            map[di1][dj1 + 1] = 0;
                            ImageViewMap[di1][dj1 + 1].setOpacity(0);
                        } 
                        if (map[di1][dj1 - 1] == 2)  {
                            map[di1][dj1 - 1] = 0;
                            ImageViewMap[di1][dj1 - 1].setOpacity(0);
                        }
                   } else if (KhoangCachNo == 2) {                       
                        if (di1 <= 10 && map[di1 + 2][dj1] == 2) {                       
                            if (map[di1 + 1][dj1] == 4)  {
                              map[di1 + 2][dj1] = 0;                      
                              ImageViewMap[di1 + 2][dj1].setOpacity(0);                             
                            }
                        } 
                        if (di1 >= 2 && map[di1 - 2][dj1] == 2) {                           
                            if (map[di1 - 1][dj1] == 4) {
                                map[di1 - 2][dj1] = 0;
                                ImageViewMap[di1 - 2][dj1].setOpacity(0);                               
                            }               
                        }
                        if (dj1 <= 28 && map[di1][dj1 + 2] == 2) {
                            if (map[di1][dj1 + 1] == 4) {
                                map[di1][dj1 + 2] = 0;
                                ImageViewMap[di1][dj1 + 2].setOpacity(0);                               
                            }       
                        } 
                        if (dj1 >= 2 && map[di1][dj1 - 2] == 2) {
                            if (map[di1][dj1 - 1] == 4) {
                                map[di1][dj1 - 2] = 0;
                                ImageViewMap[di1][dj1 - 2].setOpacity(0);                               
                            }                         
                        }  
                                              
                        if (map[di1 + 1][dj1] == 2)  {
                        map[di1 + 1][dj1] = 0;                      
                        ImageViewMap[di1 + 1][dj1].setOpacity(0);
                        } 
                        if (map[di1 - 1][dj1] == 2)  {
                            map[di1 - 1][dj1] = 0;
                            ImageViewMap[di1 - 1][dj1].setOpacity(0);
                        }
                        if (map[di1][dj1 + 1] == 2)  {
                            map[di1][dj1 + 1] = 0;
                            ImageViewMap[di1][dj1 + 1].setOpacity(0);
                        } 
                        if (map[di1][dj1 - 1] == 2)  {
                            map[di1][dj1 - 1] = 0;
                            ImageViewMap[di1][dj1 - 1].setOpacity(0);
                        }    
                         
                   }
                   // XU LI VA CHAM CUA FIRE VOI ENEMY
                   for(int j2 = 0; j2 <= sizeArrImageViewFire1; j2++) {
                      for (int i2 = 0; i2 <= sizeArrImageViewRock; i2++) {                       
                            if (vacham(ArrImageViewFire1[j2], ArrImageViewRock[i2])) {
                                    ArrImageViewRock[i2].setOpacity(0);
                                    MonterNumber--;    
                           }
                       }                    
                   }
                }
                
                if (CountTimeBoom == 180) {
                    dx1 = (int) ImageViewFireCenter.getLayoutX();
                    dy1 = (int) ImageViewFireCenter.getLayoutY();
                    di1 = dy1 / 45 + 1; dj1 = dx1 / 45 + 1;
                  if (KhoangCachNo == 1) {
                      if (map[di1 + 1][dj1] == 4)  map[di1 + 1][dj1] = 0; if (map[di1 - 1][dj1] == 4)  map[di1 - 1][dj1] = 0;
                      if (map[di1][dj1 + 1] == 4)  map[di1][dj1 + 1] = 0; if (map[di1][dj1 - 1] == 4)  map[di1][dj1 - 1] = 0;                 
                  } else if (KhoangCachNo == 2 && level == 2) {
                        if (map[di1 + 1][dj1] == 4)  map[di1 + 1][dj1] = 0; if (map[di1 - 1][dj1] == 4)  map[di1 - 1][dj1] = 0;
                        if (map[di1][dj1 + 1] == 4)  map[di1][dj1 + 1] = 0; if (map[di1][dj1 - 1] == 4)  map[di1][dj1 - 1] = 0;
                        if (di1 <= 10 && map[di1 + 2][dj1] == 4)  map[di1 + 2][dj1] = 0; if (di1 >= 2 && map[di1 - 2][dj1] == 4)  map[di1 - 2][dj1] = 0;
                        if (dj1 <= 28 && map[di1][dj1 + 2] == 4)  map[di1][dj1 + 2] = 0; if (dj1 >= 2 && map[di1][dj1 - 2] == 4)  map[di1][dj1 - 2] = 0;
                  }
                   
                   if (map[di1][dj1] == 4) map[di1][dj1] = 0;
                   destroyImageViewFire();                  
                   stop();
                }
          }
        }
        
    }
    
    PlaySound playsound = new PlaySound();
    public void endgame() {
            TextResult.setText("LOSE");
            if (level == 1) {
                ButtonLevel2.setOpacity(0);
                ButtonPlayAgain.setOpacity(1); ButtonExit.setOpacity(1);     
            } 
            String s = "sound/endgame3.wav";
            playsound.PlayMusic(s);       
        PaneResult.setVisible(true);                 
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
