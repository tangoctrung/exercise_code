/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package javafx_test;

import Boom_Fire.Boom;
import Enemy.EnemyType1;
import Enemy.EnemyType2;
import controller.InsertImage;
import Item.Item;
import controller.PlaySound;
import Sprite.Sprite;
import java.io.IOException;
import java.net.URL;
import java.util.Random;
import java.util.ResourceBundle;
import javafx.animation.AnimationTimer;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.fxml.Initializable;
import javafx.scene.Node;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.image.ImageView;
import javafx.scene.input.KeyCode;
import javafx.scene.input.KeyEvent;
import javafx.scene.input.MouseEvent;
import javafx.scene.layout.Pane;
import javafx.scene.text.Text;
import javafx.stage.Stage;

/**
 * FXML Controller class
 *
 * @author ADMIN
 */
public class FXMLController implements Initializable{
      InsertImage image = new InsertImage();
      PlaySound playsound = new PlaySound();
      
      //Boom bom1 = new Boom(0, 0, 1);
      
      ImageView[][] ImageViewMap = new ImageView[15][33];   
      ImageView[] ArrImageViewRock = new ImageView[10];
      ImageView[] ArrImageViewFire1 = new ImageView[9];
      ImageView[] ArrImageViewFire2 = new ImageView[9];
      ImageView[] ArrImageViewFire3 = new ImageView[9];
      int map[][] = {
{1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1},
{1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1},
{1, 1, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 2, 0, 2, 0, 2, 0, 0, 0, 1, 1},
{1, 1, 0, 1, 0, 1, 0, 1, 2, 1, 0, 1, 0, 1, 2, 1, 2, 1, 0, 1, 0, 1, 0, 1, 2, 1, 2, 1, 2, 1, 0, 1, 1},
{1, 1, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 2, 0, 1, 1},
{1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 2, 1, 0, 1, 0, 1, 2, 1, 2, 1, 0, 1, 0, 1, 0, 1, 0, 1, 2, 1, 1},
{1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1},
{1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 2, 1, 0, 1, 2, 1, 0, 1, 0, 1, 0, 1, 1},
{1, 1, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1},
{1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 2, 1, 0, 1, 0, 1, 0, 1, 2, 1, 2, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1},
{1, 1, 2, 0, 0, 0, 0, 2, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1},
{1, 1, 0, 1, 2, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 2, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1},
{1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1},
{1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1},
{1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1}
};
      int map1[][] = {
{1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1},
{1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1},
{1, 1, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 2, 0, 2, 0, 2, 0, 0, 0, 1, 1},
{1, 1, 0, 1, 0, 1, 0, 1, 2, 1, 0, 1, 0, 1, 2, 1, 2, 1, 0, 1, 0, 1, 0, 1, 2, 1, 2, 1, 2, 1, 0, 1, 1},
{1, 1, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 2, 0, 1, 1},
{1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 2, 1, 0, 1, 0, 1, 2, 1, 2, 1, 0, 1, 0, 1, 0, 1, 0, 1, 2, 1, 1},
{1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1},
{1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 2, 1, 0, 1, 2, 1, 0, 1, 0, 1, 0, 1, 1},
{1, 1, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1},
{1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 2, 1, 0, 1, 0, 1, 0, 1, 2, 1, 2, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1},
{1, 1, 2, 0, 0, 0, 0, 2, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1},
{1, 1, 0, 1, 2, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 2, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1},
{1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1},
{1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1},
{1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1}
};
      // 1 la wall
      // 2 la box
      // 0 la grass
      // 5 la item bom
      // 6 la portal
      // 7 la flame item    
           
    @FXML private Button btnUP, btnDOWN, btnLEFT, btnRIGHT;
    @FXML private ImageView background;
    @FXML private ImageView ImageBom;
    @FXML private ImageView ImageViewSprite;
    @FXML private Pane PaneBackGround;
    @FXML private ImageView ImageViewWall1, ImageViewWall2, ImageViewWall3, ImageViewWall4, ImageViewWall5;
    @FXML private ImageView ImageViewWall6, ImageViewWall7, ImageViewWall8, ImageViewWall9, ImageViewWall10;
    @FXML private ImageView ImageViewWall11, ImageViewWall12, ImageViewWall13, ImageViewWall14, ImageViewWall15;
    @FXML private ImageView ImageViewWall16, ImageViewWall17, ImageViewWall18, ImageViewWall19, ImageViewWall20;
    @FXML private ImageView ImageViewWall21, ImageViewWall22, ImageViewWall23, ImageViewWall24, ImageViewWall25;
    @FXML private ImageView ImageViewWall26, ImageViewWall27, ImageViewWall28, ImageViewWall29, ImageViewWall30;
    @FXML private ImageView ImageViewWall31, ImageViewWall32, ImageViewWall33, ImageViewWall34, ImageViewWall35;
    @FXML private ImageView ImageViewWall36, ImageViewWall37, ImageViewWall38, ImageViewWall39, ImageViewWall40;
    @FXML private ImageView ImageViewWall41, ImageViewWall42, ImageViewWall43, ImageViewWall44, ImageViewWall45;
    @FXML private ImageView ImageViewWall46, ImageViewWall47, ImageViewWall48, ImageViewWall49, ImageViewWall50;
    @FXML private ImageView ImageViewWall51, ImageViewWall52, ImageViewWall53, ImageViewWall54, ImageViewWall55;
    @FXML private ImageView ImageViewWall56, ImageViewWall57, ImageViewWall58, ImageViewWall59, ImageViewWall60;
    @FXML private ImageView ImageViewWall61, ImageViewWall62, ImageViewWall63, ImageViewWall64, ImageViewWall65;
    @FXML private ImageView ImageViewWall66, ImageViewWall67, ImageViewWall68, ImageViewWall69, ImageViewWall70;
    
    @FXML private ImageView ImageViewBox1, ImageViewBox2, ImageViewBox3, ImageViewBox4, ImageViewBox5;
    @FXML private ImageView ImageViewBox6, ImageViewBox7, ImageViewBox8, ImageViewBox9, ImageViewBox10;
    @FXML private ImageView ImageViewBox11, ImageViewBox12, ImageViewBox13, ImageViewBox14, ImageViewBox15;
    @FXML private ImageView ImageViewBox16, ImageViewBox17, ImageViewBox18, ImageViewBox19, ImageViewBox20;
    @FXML private ImageView ImageViewBox21, ImageViewBox22, ImageViewBox23, ImageViewBox24, ImageViewBox25;
    @FXML private ImageView ImageViewBox26, ImageViewBox27, ImageViewBox28, ImageViewBox29, ImageViewBox30;
    @FXML private ImageView ImageViewBox31, ImageViewBox32, ImageViewBox33, ImageViewBox34, ImageViewBox35;
    @FXML private ImageView ImageViewBox36, ImageViewBox37, ImageViewBox38, ImageViewBox39, ImageViewBox40;
    @FXML private ImageView ImageViewBox41, ImageViewBox42, ImageViewBox43, ImageViewBox44, ImageViewBox45;
    @FXML private ImageView ImageViewBox46, ImageViewBox47, ImageViewBox48;     
    
    @FXML private ImageView ImageViewRock1, ImageViewRock2, ImageViewRock3, ImageViewRock4, ImageViewRock5;
    @FXML private ImageView ImageViewRock6, ImageViewRock7, ImageViewRock8, ImageViewRock9;
    
    @FXML private ImageView ImageViewBom1, ImageViewBom2, ImageViewBom3, ImageViewItemBom1, ImageViewItemBom2, ImageViewItemBom3;
    @FXML private ImageView ImageViewItemFire, ImageViewItemSpeed, ImageViewItemHp, ImageViewItemMove; 
    @FXML private ImageView ImageViewFireCenter, ImageViewFireUp, ImageViewFireDown, ImageViewFireLeft, ImageViewFireRight;
    @FXML private ImageView ImageViewFireUp1, ImageViewFireDown1, ImageViewFireLeft1, ImageViewFireRight1;
    
    @FXML private Pane PaneResult;
    @FXML private Text TextResult;
    @FXML private Text TextTimeResult;
    @FXML private Text LabelTimePlay;
      
    public int seconds = 0,minutes = 5, hours = 0, dem = 0, BoomNumber = 1, dBoomNumber = 0, Hp = 1, time = 300;
    public  boolean isPlayGame = true;
    public  int kc = 8, danhdauMove = 0, MonterNumber = 9;
    int dem1 = 0, danhdau = 0;
    double a1 = 0, a2 = 0, a3 = 0, a4 = 0, a5 = 0, a6 = 0, a7 = 0, a8 = 0, a9 = 0, a10 = 0;
    int dx1,dy1,di1,dj1;
    int danhdauMap = 1, d = 1;
    boolean isMove = false;
     
    
      EnemyType1 rock1 = new EnemyType1(180, 405, 0.5, 1.2, map, ImageViewRock1, 1, 0);
      EnemyType1 rock2 = new EnemyType1(225, 135, 0.5, 1.2, map, ImageViewRock2, 2, 0);
      EnemyType1 rock3 = new EnemyType1(315, 315, 0.5, 1.2, map, ImageViewRock3, 1, 0);
      EnemyType1 rock4 = new EnemyType1(675, 270, 0.5, 1.2, map, ImageViewRock4, 2, 0);
      EnemyType1 rock5 = new EnemyType1(270, 225, 0.75, 2, map, ImageViewRock5, 1, 0);
      EnemyType1 rock6 = new EnemyType1(540, 45, 0.75, 2, map, ImageViewRock6, 1, 0);
      EnemyType1 rock7 = new EnemyType1(810, 315, 0.75, 2, map, ImageViewRock7, 1, 0);
      
      EnemyType2 rock8 = new EnemyType2(765, 405, map, ImageViewRock8, ImageViewSprite, 0);
      EnemyType2 rock9 = new EnemyType2(1215, 315, map, ImageViewRock8, ImageViewSprite, 0);
      
      Item ItemFire = new Item(180, 135, map, ImageViewItemFire);
      Item ItemMove = new Item(360, 45, map, ImageViewItemMove);
      Item ItemSpeed = new Item(675, 45, map, ImageViewItemSpeed);
      Item ItemHp = new Item(45, 405, map, ImageViewItemHp); 
      Sprite sp = new Sprite(53, 45, map, ImageViewSprite, 30, PaneBackGround);
      Boom bom = new Boom(0, 0, 1, map);
    
    
    @FXML public void ClickJFXButtonUP(MouseEvent event) {    
        if (bom.isIsPlaygame()) {
            if (isMove == false) {
              sp.MoveUp();
            } else {
                sp.MoveDown();
            }      
            vachamItemFire(); vachamItemHp(); vachamItemMove(); vachamItemSpeed();
        }
         
    }
    @FXML public void ClickJFXButtonDOWN(MouseEvent event) {     
        if (bom.isIsPlaygame()) {
            if (isMove == false) {
             sp.MoveDown();
            } else {
                sp.MoveUp();
            }       
           vachamItemFire(); vachamItemHp(); vachamItemMove(); vachamItemSpeed();
        }
        
    }
    @FXML public void ClickJFXButtonLEFT(MouseEvent event) {    
        if (bom.isIsPlaygame()) {
            if (isMove == false) {
             sp.MoveLeft();                   
            } else {
                sp.MoveRight();
            }         
           vachamItemFire(); vachamItemHp(); vachamItemMove(); vachamItemSpeed();
           }
        
    }
    @FXML public void ClickJFXButtonRIGHT(MouseEvent event) {     
        if (bom.isIsPlaygame()) {
            if (isMove == false) {
             sp.MoveRight();
            } else {
                sp.MoveLeft();
            }    
           vachamItemFire(); vachamItemHp(); vachamItemMove(); vachamItemSpeed();
        }
        
    }
    
    @FXML public void MoveBoard(KeyEvent event) {
        if (bom.isIsPlaygame()) {
             if (event.getCode() == KeyCode.W) {       
              
              if (isMove == false) {
                  sp.MoveUp();
                } else {
                    sp.MoveDown();
                }                
            }
            if (event.getCode() == KeyCode.S) {
                
                if (isMove == false) {
                    sp.MoveDown();
                } else {
                      sp.MoveUp();
                } 
            }
            if (event.getCode() == KeyCode.A) {
                
                if (isMove == false) {
                    sp.MoveLeft();
                } else {
                      sp.MoveRight();
                } 
            }
            if (event.getCode() == KeyCode.D) {
                
                 if (isMove == false) {
                     sp.MoveRight();
                 } else {
                      sp.MoveLeft();
                 }  
            }           
            vachamItemFire(); vachamItemHp(); vachamItemMove(); vachamItemSpeed();
        }
          
      }
    @FXML public void PressEnter(KeyEvent event) {
        if (bom.isIsPlaygame()) {
            if (event.getCode() == KeyCode.ENTER) {
                bom.AniBom();
                String s = "sound/BOM_SET.wav";
                playsound.PlayMusic(s);
            }
        }
    }
    
    
    @FXML public void ClickImageBom(MouseEvent event) {
        if (isPlayGame) {    
            if (bom.getdBoomNumber() < bom.getBoomNumber()) {
                bom.setdBoomNumber(bom.getdBoomNumber() + 1);
                bom.AniBom();
                String s = "sound/BOM_SET.wav";
                playsound.PlayMusic(s); 
            }          
        }                     
    }
    
    @FXML public void OnMouseEntered(MouseEvent event) {
         ImageBom.setOpacity(.5);
    }
    @FXML public void OnMouseExited(MouseEvent event) {
         ImageBom.setOpacity(1);
    }
    
    @Override
    public void initialize(URL url, ResourceBundle rb) {
        String s = "sound/soundtrack.wav";
        playsound.PlayMusic(s);
        
        image.insertimage("IMAGE/background1.png", background);         
        image.insertimage("IMAGE/bom/bom.png", ImageBom);     
        //image.insertimage("IMAGE/sprite/down1.png", ImageViewSprite);
        initSprite();
        initImageViewItem();
        insertImageViewRock();
        initImage();    
        initImageViewBoom();
        HidePaneResult();
        initArrImageViewRock();      
               
        AnimationTimer aniRock1 = new TimerRotateRock1();
        aniRock1.start();
        ImageViewRock8.setFitHeight(45);
        ImageViewRock8.setFitWidth(45);
        AnimationTimer aniRock8 = new TimeRock8Move();
        aniRock8.start();
        AnimationTimer aniRock9 = new TimeRock9Move();
        aniRock9.start();
       
       
     }
    
    private void initSprite() {
        sp.LoadImage("IMAGE/sprite/down1.png", ImageViewSprite);
        ImageViewSprite.setLayoutX(53); ImageViewSprite.setLayoutY(45); 
        sp.setImageViewSprite(ImageViewSprite);
        sp.setMap(map);
        sp.setfps(30);
        sp.setPaneBackGround(PaneBackGround);
        sp.setLevel(2);
    }
    
    private void initArrImageViewRock() {
        ArrImageViewRock[0] = ImageViewRock1; ArrImageViewRock[1] = ImageViewRock2; ArrImageViewRock[2] = ImageViewRock3; ArrImageViewRock[3] = ImageViewRock4;
        ArrImageViewRock[4] = ImageViewRock5; ArrImageViewRock[5] = ImageViewRock6; ArrImageViewRock[6] = ImageViewRock7; ArrImageViewRock[7] = ImageViewRock8;
        ArrImageViewRock[8] = ImageViewRock9; 
    }
    

        
    private class TimerRotateRock1 extends AnimationTimer {
        
        @Override
        public void handle(long now) {    
            
            if (bom.isIsPlaygame()) {           
                // XU LI VA CHAM CUA NHAN VAT VOI ENEMY
             if (rock1.vacham(ImageViewSprite, ImageViewRock1) || rock1.vacham(ImageViewSprite, ImageViewRock2) || rock1.vacham(ImageViewSprite, ImageViewRock3) || 
                     rock1.vacham(ImageViewSprite, ImageViewRock4) || rock1.vacham(ImageViewSprite, ImageViewRock5) || rock1.vacham(ImageViewSprite, ImageViewRock6) || 
                     rock1.vacham(ImageViewSprite, ImageViewRock7)) {
                          bom.setIsPlaygame(false);
                          endgame();  
             }

             rock1.Move(); rock2.Move(); rock3.Move(); rock4.Move(); 
             rock5.Move(); rock6.Move(); rock7.Move();
                                                                       
            }
        }
        
    }
    
    private void initImage() {
        ImageViewMap[3][3] = ImageViewWall1; ImageViewMap[5][3] = ImageViewWall2; ImageViewMap[7][3] = ImageViewWall3; ImageViewMap[9][3] = ImageViewWall4;ImageViewMap[11][3] = ImageViewWall5;
        ImageViewMap[3][5] = ImageViewWall6; ImageViewMap[5][5] = ImageViewWall7; ImageViewMap[7][5] = ImageViewWall8; ImageViewMap[9][5] = ImageViewWall9;ImageViewMap[11][5] = ImageViewWall10;
        ImageViewMap[3][7] = ImageViewWall11; ImageViewMap[5][7] = ImageViewWall12; ImageViewMap[7][7] = ImageViewWall13; ImageViewMap[9][7] = ImageViewWall14;ImageViewMap[11][7] = ImageViewWall15;
        ImageViewMap[3][9] = ImageViewWall16; ImageViewMap[5][9] = ImageViewWall17; ImageViewMap[7][9] = ImageViewWall18; ImageViewMap[9][9] = ImageViewWall19;ImageViewMap[11][9] = ImageViewWall20;
        ImageViewMap[3][11] = ImageViewWall21; ImageViewMap[5][11] = ImageViewWall22; ImageViewMap[7][11] = ImageViewWall23; ImageViewMap[9][11] = ImageViewWall24;ImageViewMap[11][11] = ImageViewWall25;
        ImageViewMap[3][13] = ImageViewWall26; ImageViewMap[5][13] = ImageViewWall27; ImageViewMap[7][13] = ImageViewWall28; ImageViewMap[9][13] = ImageViewWall29;ImageViewMap[11][13] = ImageViewWall30;
        ImageViewMap[3][15] = ImageViewWall31; ImageViewMap[5][15] = ImageViewWall32; ImageViewMap[7][15] = ImageViewWall33; ImageViewMap[9][15] = ImageViewWall34;ImageViewMap[11][15] = ImageViewWall35;
        ImageViewMap[3][17] = ImageViewWall36; ImageViewMap[5][17] = ImageViewWall37; ImageViewMap[7][17] = ImageViewWall38; ImageViewMap[9][17] = ImageViewWall39;ImageViewMap[11][17] = ImageViewWall40;
        ImageViewMap[3][19] = ImageViewWall41; ImageViewMap[5][19] = ImageViewWall42; ImageViewMap[7][19] = ImageViewWall43; ImageViewMap[9][19] = ImageViewWall44;ImageViewMap[11][19] = ImageViewWall45;
        ImageViewMap[3][21] = ImageViewWall46; ImageViewMap[5][21] = ImageViewWall47; ImageViewMap[7][21] = ImageViewWall48; ImageViewMap[9][21] = ImageViewWall49;ImageViewMap[11][21] = ImageViewWall50;
        ImageViewMap[3][23] = ImageViewWall51; ImageViewMap[5][23] = ImageViewWall52; ImageViewMap[7][23] = ImageViewWall53; ImageViewMap[9][23] = ImageViewWall54;ImageViewMap[11][23] = ImageViewWall55;
        ImageViewMap[3][25] = ImageViewWall56; ImageViewMap[5][25] = ImageViewWall57; ImageViewMap[7][25] = ImageViewWall58; ImageViewMap[9][25] = ImageViewWall59;ImageViewMap[11][25] = ImageViewWall60;
        ImageViewMap[3][27] = ImageViewWall61; ImageViewMap[5][27] = ImageViewWall62; ImageViewMap[7][27] = ImageViewWall63; ImageViewMap[9][27] = ImageViewWall64;ImageViewMap[11][27] = ImageViewWall65;
        ImageViewMap[3][29] = ImageViewWall66; ImageViewMap[5][29] = ImageViewWall67; ImageViewMap[7][29] = ImageViewWall68; ImageViewMap[9][29] = ImageViewWall69;ImageViewMap[11][29] = ImageViewWall70;
        
        ImageViewMap[8][2] = ImageViewBox1; ImageViewMap[10][2] = ImageViewBox2; 
        ImageViewMap[11][4] = ImageViewBox3; 
        ImageViewMap[4][5] = ImageViewBox4; ImageViewMap[8][5] = ImageViewBox5; 
        ImageViewMap[10][7] = ImageViewBox6; 
        ImageViewMap[3][8] = ImageViewBox7;  ImageViewMap[10][8] = ImageViewBox8;
        ImageViewMap[2][9] = ImageViewBox9; 
        ImageViewMap[2][11] = ImageViewBox10; ImageViewMap[10][11] = ImageViewBox11;
        ImageViewMap[4][12] = ImageViewBox12; ImageViewMap[5][12] = ImageViewBox13; ImageViewMap[8][12] = ImageViewBox14;
        ImageViewMap[4][13] = ImageViewBox15; ImageViewMap[12][13] = ImageViewBox16; 
        ImageViewMap[3][14] = ImageViewBox17; ImageViewMap[6][14] = ImageViewBox18;
        ImageViewMap[6][15] = ImageViewBox19; ImageViewMap[8][15] = ImageViewBox20; 
        ImageViewMap[2][16] = ImageViewBox21; ImageViewMap[3][16] = ImageViewBox22; ImageViewMap[4][16] = ImageViewBox23;
        ImageViewMap[12][17] = ImageViewBox24;
        ImageViewMap[5][18] = ImageViewBox25; ImageViewMap[6][18] = ImageViewBox26; ImageViewMap[9][18] = ImageViewBox27; ImageViewMap[11][18] = ImageViewBox28; 
        ImageViewMap[10][19] = ImageViewBox29; 
        ImageViewMap[2][20] = ImageViewBox30; ImageViewMap[5][20] = ImageViewBox31;ImageViewMap[7][20] = ImageViewBox32; ImageViewMap[9][20] = ImageViewBox33; ImageViewMap[12][20] = ImageViewBox34; 
        ImageViewMap[6][21] = ImageViewBox35; 
        ImageViewMap[8][22] = ImageViewBox36;
        ImageViewMap[2][23] = ImageViewBox37; ImageViewMap[4][23] = ImageViewBox38; 
        ImageViewMap[3][24] = ImageViewBox39; ImageViewMap[7][24] = ImageViewBox40;
        ImageViewMap[2][25] = ImageViewBox41; 
        ImageViewMap[3][26] = ImageViewBox42;
        ImageViewMap[2][27] = ImageViewBox43; ImageViewMap[4][27] = ImageViewBox44; 
        ImageViewMap[3][28] = ImageViewBox45; 
        ImageViewMap[4][29] = ImageViewBox46;
        ImageViewMap[5][30] = ImageViewBox47; 
        ImageViewMap[9][10] = ImageViewBox48; 
        
        ArrImageViewFire1[0] = ImageViewFireCenter; ArrImageViewFire1[1] = ImageViewFireLeft; ArrImageViewFire1[2] = ImageViewFireLeft1;
        ArrImageViewFire1[3] = ImageViewFireRight; ArrImageViewFire1[4] = ImageViewFireRight1; ArrImageViewFire1[5] = ImageViewFireUp;
        ArrImageViewFire1[6] = ImageViewFireUp1; ArrImageViewFire1[7] = ImageViewFireDown; ArrImageViewFire1[8] = ImageViewFireDown1;
        
        for(int i = 1; i <= 13; i++) {
            for(int j = 1; j <= 31; j++) {
                if (map[i][j] == 1 && (i != 1 && i != 13 && j != 1 && j != 31)) {
                    image.insertimage("IMAGE/wall3.jpg", ImageViewMap[i][j]);
                }     
                if (map[i][j] == 2) {
                    image.insertimage("IMAGE/box1.gif", ImageViewMap[i][j]);
                    double x = (j - 1) * 45;
                    double y = (i - 1) * 45;
                    ImageViewMap[i][j].setLayoutX(x);
                    ImageViewMap[i][j].setLayoutY(y);
                }   
            }
        }
    }
  
    private void insertImageViewRock() {    
        rock1.LoadImage("IMAGE/rock1.png", ImageViewRock1);
        ImageViewRock1.setLayoutX(rock1.getdx());
        ImageViewRock1.setLayoutY(rock1.getdy());
        rock1.setMap(map); rock1.setimage(ImageViewRock1); 
        rock1.setIsPlaygame(true);
        rock2.LoadImage("IMAGE/rock1.png", ImageViewRock2);
        ImageViewRock2.setLayoutX(rock2.getdx());
        ImageViewRock2.setLayoutY(rock2.getdy());
        rock2.setMap(map); rock2.setimage(ImageViewRock2);
        rock2.setIsPlaygame(true);
        rock3.LoadImage("IMAGE/rock1.png", ImageViewRock3);
        ImageViewRock3.setLayoutX(rock3.getdx());
        ImageViewRock3.setLayoutY(rock3.getdy());
        rock3.setMap(map); rock3.setimage(ImageViewRock3);
        rock3.setIsPlaygame(true);
        rock4.LoadImage("IMAGE/rock1.png", ImageViewRock4);
        ImageViewRock4.setLayoutX(rock4.getdx());
        ImageViewRock4.setLayoutY(rock4.getdy());
        rock4.setMap(map); rock4.setimage(ImageViewRock4);
        rock4.setIsPlaygame(true);
        rock5.LoadImage("IMAGE/rock2.png", ImageViewRock5);
        ImageViewRock5.setLayoutX(rock5.getdx());
        ImageViewRock5.setLayoutY(rock5.getdy());
        rock5.setMap(map); rock5.setimage(ImageViewRock5);
        rock5.setIsPlaygame(true);
        rock6.LoadImage("IMAGE/rock2.png", ImageViewRock6);
        ImageViewRock6.setLayoutX(rock6.getdx());
        ImageViewRock6.setLayoutY(rock6.getdy());
        rock6.setMap(map); rock6.setimage(ImageViewRock6);
        rock6.setIsPlaygame(true);
        rock7.LoadImage("IMAGE/rock2.png", ImageViewRock7);
        ImageViewRock7.setLayoutX(rock7.getdx());
        ImageViewRock7.setLayoutY(rock7.getdy());
        rock7.setMap(map); rock7.setimage(ImageViewRock7);
        rock7.setIsPlaygame(true);
        
        rock8.insertimage("IMAGE/rock4.png", ImageViewRock8);
        ImageViewRock8.setLayoutX(rock8.getdx());
        ImageViewRock8.setLayoutY(rock8.getdy());
        rock8.setMap(map); rock8.setImageViewSprite(ImageViewSprite); rock8.setimage(ImageViewRock8);
        rock9.insertimage("IMAGE/rock3.png", ImageViewRock9);
        ImageViewRock9.setLayoutX(rock9.getdx());
        ImageViewRock9.setLayoutY(rock9.getdy());     
        rock9.setMap(map); rock9.setImageViewSprite(ImageViewSprite); rock9.setimage(ImageViewRock9);
    }
     

    private void initImageViewItem() {   
        
        ItemFire.LoadImage("IMAGE/item/item_fire.png", ImageViewItemFire);
        ItemSpeed.LoadImage("IMAGE/item/item_speed.png", ImageViewItemSpeed);
        ItemHp.LoadImage("IMAGE/item/item_win.gif", ImageViewItemHp);
        ItemMove.LoadImage("IMAGE/item/item_move.png", ImageViewItemMove);
        ItemFire.setimage(ImageViewItemFire); ItemSpeed.setimage(ImageViewItemSpeed); ItemHp.setimage(ImageViewItemHp);
        ItemMove.setimage(ImageViewItemMove);
        
        ImageViewItemHp.setOpacity(1);
        ImageViewItemFire.setOpacity(1); ImageViewItemSpeed.setOpacity(1);
        Random ran = new Random();
        int x = ran.nextInt(3);
        switch(x) {
            case 0:
                ImageViewItemHp.setLayoutX(45); ImageViewItemHp.setLayoutY(405);
                break;
            case 1:
                ImageViewItemHp.setLayoutX(1305); ImageViewItemHp.setLayoutY(180);
                break;              
            case 2:
                ImageViewItemHp.setLayoutX(675); ImageViewItemHp.setLayoutY(90);
                break;
        }
                
        
        ImageViewItemFire.setLayoutX(ItemFire.getdx()); ImageViewItemFire.setLayoutY(ItemFire.getdy());
        ImageViewItemSpeed.setLayoutX(ItemSpeed.getdx()); ImageViewItemSpeed.setLayoutY(ItemSpeed.getdy());
        ImageViewItemMove.setLayoutX(ItemMove.getdx()); ImageViewItemMove.setLayoutY(ItemMove.getdy());
    }
    
    private void initImageViewBoom() {
        bom.setImageViewBom(ImageViewBom1);
        bom.setImageViewSprite(ImageViewSprite);
        bom.setMap(map);
        bom.Destroy(bom.getImageViewBom());
           bom.setArrImageViewRock(ArrImageViewRock);
           bom.setImageViewMap(ImageViewMap);
           bom.setArrImageViewFire1(ArrImageViewFire1);
           bom.setSizeArrImageViewFire1(8);
           bom.setSizeArrImageViewRock(8);
           bom.setImageViewFireCenter(ImageViewFireCenter);
           bom.setImageViewFireDown1(ImageViewFireDown); bom.setImageViewFireDown2(ImageViewFireDown1);
           bom.setImageViewFireLeft1(ImageViewFireLeft); bom.setImageViewFireLeft2(ImageViewFireLeft1);
           bom.setImageViewFireRight1(ImageViewFireRight); bom.setImageViewFireRight2(ImageViewFireRight1);
           bom.setImageViewFireUp1(ImageViewFireUp); bom.setImageViewFireUp2(ImageViewFireUp1);
           bom.setPaneResult(PaneResult);       
           bom.setTextResult(TextResult);
           bom.setIsPlaygame(isPlayGame);
           bom.setMonterNumber(9);
           bom.setdBoomNumber(0);
           bom.setBoomNumber(1);
           bom.setLevel(2);
    }
    
    public int Movedanhdau = 0;
    public int Movedanhdau1 = 0;
       
    private void ShowPaneResult() {
        PaneResult.setVisible(true);
    }
    
    private void HidePaneResult() {
        PaneResult.setVisible(false);
    }
  
   
    
    public void ClickButtonPlayAgain(ActionEvent event) throws IOException {              
        startgame();   
                     Parent tableViewParent = FXMLLoader.load(getClass().getResource("Man1.fxml"));
                     Scene tableViewScene = new Scene(tableViewParent);        
                     Stage window = (Stage) ((Node)event.getSource()).getScene().getWindow();
                     window.setScene(tableViewScene);
                     window.show();
    }
    Stage stage;
    public void ClickButtonExit(ActionEvent event) {
        stage = (Stage) ((Button) event.getSource()).getScene().getWindow();
        stage.close();
    }
    
    public void endgame() {
        if (MonterNumber == 0) {
            TextResult.setText("WIN");
            String s = "sound/CRYST_UP.wav";
            playsound.PlayMusic(s);
        } else {
            TextResult.setText("LOSE");
            String s = "sound/endgame3.wav";
            playsound.PlayMusic(s);
        }      
       
        PaneResult.setVisible(true);                
    }
       
    
    public void SoundBomNo() {
        String s = "sound/BOM_11_M.wav";
        playsound.PlayMusic(s);
    }
    public void SoundDatBom() {
       String s = "sound/BOM_SET.wav";
       playsound.PlayMusic(s);
    }
      
    public void startgame() {   
        ImageViewSprite.setOpacity(1);
        ImageViewRock8.setFitHeight(45);
        ImageViewRock8.setFitWidth(45);
        if (ImageViewBom1.getOpacity() == 1) {
            ImageViewBom1.setOpacity(0);             
        }
        HidePaneResult();
        
        initImageViewItem();
        PaneBackGround.setLayoutX(0);
        String s = "sound/soundtrack.wav";
        playsound.PlayMusic(s);
        bom.setKhoangCachNo(1);
        int i,j;
        for(i = 0; i <= 13; i++) {
            for(j = 0; j <= 31; j++)
                map[i][j] = map1[i][j];              
        }
        for(i = 0; i <= 13; i++) {
            for(j = 0; j <= 31; j++)
                if (map[i][j] == 2) {
                   if (ImageViewMap[i][j].getOpacity() == 0) {
                     ImageViewMap[i][j].setOpacity(1);
                   }
                }          
        }
        for(i = 0; i <= 8; i++) {
            if (ArrImageViewRock[i].getOpacity() == 0) {
                ArrImageViewRock[i].setOpacity(1);
            }
        }
        
        ImageViewSprite.setLayoutX(53); ImageViewSprite.setLayoutY(45);  
        bom.destroyImageViewFire();
        initImage();
        insertImageViewRock();
     dem = 0; BoomNumber = 1; dBoomNumber = 0;
     
     bom.setIsPlaygame(true);
     isMove = false;
     kc = 8; danhdauMove = 0;
    }

    private void vachamItemFire() {
        if (sp.vacham(sp.getImageView(), ItemFire.getimage())) {
            ItemFire.Destroy(ItemFire.getimage());
            String s = "sound/Item.wav";
            playsound.PlayMusic(s);
            bom.setKhoangCachNo(2);
        }     
    }
    private void vachamItemSpeed() {
        if (sp.vacham(ImageViewSprite, ImageViewItemSpeed)) {
            if (ImageViewSprite.getLayoutX() == ImageViewItemSpeed.getLayoutX() + 8 && ImageViewSprite.getLayoutY() == ImageViewItemSpeed.getLayoutY()) {
                     sp.setfps(18);
                     ItemSpeed.Destroy(ItemSpeed.getimage());
                     String s = "sound/Item.wav";
                     playsound.PlayMusic(s);
            }
            
        }       
    }
    private void vachamItemHp() {
        if (sp.vacham(ImageViewSprite, ImageViewItemHp) && bom.getMonterNumber() == 0) {
            isPlayGame = false;
            ShowPaneResult();
            ItemHp.Destroy(ItemHp.getimage());
            String s = "sound/Item.wav";
            playsound.PlayMusic(s);
        }     
    }
    private void vachamItemMove() {
        if (ImageViewSprite.getLayoutX() == ImageViewItemMove.getLayoutX() + 8 && ImageViewSprite.getLayoutY() == ImageViewItemMove.getLayoutY()) {
             isMove = true;
             bom.setKhoangCachNo(1);
             ItemMove.Destroy(ItemMove.getimage());
             String s = "sound/Item.wav";
             playsound.PlayMusic(s);
             TimeSpriteMove time = new TimeSpriteMove();
             time.start();
        }
    }

    private class TimeSpriteMove extends AnimationTimer {
        int dem = 0;
        @Override
        public void handle(long now) {
            dem++;
            if (dem == 2000) {
                isMove = false;
                stop();
            }
        }
        
    }
    
    private class TimeRock8Move extends AnimationTimer {
        int dem = 0, dem1 = 0;
        Random ran = new Random();
        int random = ran.nextInt(30) + 30;
        @Override
        public void handle(long now) {
              dem ++; dem1++;
              if (dem == random) {
                  rock8.Move();
                  if (rock8.vacham(ImageViewSprite, ImageViewRock8)) {
                      bom.setIsPlaygame(false);
                      endgame();
                  }
                  dem = 0;
              }                   
        }
        
    }
    private class TimeRock9Move extends AnimationTimer {
        int dem = 0, dem1 = 0;
        Random ran = new Random();
        int random = ran.nextInt(40) + 20;
        @Override
        public void handle(long now) {
              dem1++;            
              if (dem1 == random) {
                  rock9.Move();
                  if (rock8.vacham(ImageViewSprite, ImageViewRock8)) {
                      isPlayGame = false;
                      endgame();
                  }
                  dem1 = 0;
              }            
        }
        
    }
    
    
}
