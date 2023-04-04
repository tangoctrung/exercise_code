/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package javafx_test;

import Boom_Fire.Boom;
import Enemy.EnemyType1;
import Enemy.EnemyType2;
import Item.Item;
import Sprite.Sprite;
import controller.InsertImage;
import controller.PlaySound;
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
public class Man1Controller implements Initializable {
    int map[][] = {
{1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1},
{1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1},
{1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1},
{1, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 1},
{1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1},
{1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1},
{1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1},
{1, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 1},
{1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1},
{1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1},
{1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1},
{1, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 1},
{1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1},
{1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1},
{1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1}
};
      int map1[][] = {
{1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1},
{1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1},
{1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1},
{1, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 1},
{1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1},
{1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1},
{1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1},
{1, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 1},
{1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1},
{1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1},
{1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1},
{1, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 1},
{1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1},
{1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1},
{1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1}
};
    @FXML Button ButtonLevel_Next, ButtonPlayAgain, ButtonExit;    
    @FXML Text TextWin_Lose;
    
    @FXML private ImageView ImageViewWall1, ImageViewWall2, ImageViewWall3, ImageViewWall4, ImageViewWall5;
    @FXML private ImageView ImageViewWall6, ImageViewWall7, ImageViewWall8, ImageViewWall9, ImageViewWall10;
    @FXML private ImageView ImageViewWall11, ImageViewWall12, ImageViewWall13, ImageViewWall14, ImageViewWall15;
    @FXML private ImageView ImageViewWall16, ImageViewWall17, ImageViewWall18, ImageViewWall19, ImageViewWall20;
    @FXML private ImageView ImageViewWall21, ImageViewWall22, ImageViewWall23, ImageViewWall24, ImageViewWall25;
    @FXML private ImageView ImageViewWall26, ImageViewWall27, ImageViewWall28, ImageViewWall29, ImageViewWall30;
    @FXML private ImageView ImageViewWall31, ImageViewWall32, ImageViewWall33, ImageViewWall34, ImageViewWall35;
    @FXML private ImageView ImageViewWall36, ImageViewWall37, ImageViewWall38, ImageViewWall39, ImageViewWall40;
    @FXML private ImageView ImageViewWall41, ImageViewWall42, ImageViewWall43, ImageViewWall44, ImageViewWall45;
    
    @FXML private ImageView ImageViewBox1, ImageViewBox2, ImageViewBox3, ImageViewBox4, ImageViewBox5;
    @FXML private ImageView ImageViewBox6, ImageViewBox7, ImageViewBox8, ImageViewBox9, ImageViewBox10;
    @FXML private ImageView ImageViewBox11, ImageViewBox12, ImageViewBox13, ImageViewBox14, ImageViewBox15;
    @FXML private ImageView ImageViewBox16, ImageViewBox17, ImageViewBox18, ImageViewBox19, ImageViewBox20;
    @FXML private ImageView ImageViewBox21, ImageViewBox22, ImageViewBox23, ImageViewBox24, ImageViewBox25;
    @FXML private ImageView ImageViewBox26, ImageViewBox27, ImageViewBox28, ImageViewBox29, ImageViewBox30;
     
    @FXML private ImageView ImageViewRock1, ImageViewRock2, ImageViewRock3, ImageViewRock4, ImageViewRock5;
    
    @FXML private ImageView ImageViewFireCenter, ImageViewFireLeft, ImageViewFireRight, ImageViewFireUp, ImageViewFireDown;
    @FXML private ImageView ImageViewBackground, ImageViewBom1, ImageViewBom, ImageViewSprite, ImageViewItemHp;
    @FXML private Pane PaneResult;
    
    InsertImage image = new InsertImage();
    PlaySound playsound = new PlaySound();
    
    ImageView[][] ImageViewMap = new ImageView[15][23];  
    ImageView[] ArrImageViewFire1 = new ImageView[5];
    ImageView[] ArrImageViewRock = new ImageView[5];
    
      EnemyType1 rock1 = new EnemyType1(180, 135, 0.5, 1.2, map, ImageViewRock1, 3, 0);
      EnemyType1 rock2 = new EnemyType1(765, 225, -0.5, 1.2, map, ImageViewRock2, 3, 0);
      EnemyType1 rock4 = new EnemyType1(315, 315, 0.75, 1.2, map, ImageViewRock4, 3, 0);
      EnemyType1 rock5 = new EnemyType1(540, 405, -1, 1.2, map, ImageViewRock5, 3, 0);
      
      EnemyType2 rock3 = new EnemyType2(135, 495, map, ImageViewRock3, ImageViewSprite, 0);
 
      Item ItemHp = new Item(585, 270, map, ImageViewItemHp); 
      
    Sprite sp = new Sprite(53, 45, map, ImageViewSprite, 30, PaneResult);
    Boom bom = new Boom(0, 0, 1, map);
    
    @FXML public void clickButtonLevel2(ActionEvent event) throws IOException {               
                if (ButtonLevel_Next.getOpacity() == 1 && TextWin_Lose.getText().equals("WIN")) {
                     Parent tableViewParent = FXMLLoader.load(getClass().getResource("FXML.fxml"));
                     Scene tableViewScene = new Scene(tableViewParent);        
                     Stage window = (Stage) ((Node)event.getSource()).getScene().getWindow();
                     window.setScene(tableViewScene);
                     window.show();
                }
                else {
                    
                }
            }
    @FXML public void ClickJFXButtonUP(MouseEvent event) {         
        if (bom.isIsPlaygame()) {  
              sp.MoveUp();       
              vachamItemHp();
        }
         
    }
    @FXML public void ClickJFXButtonDOWN(MouseEvent event) {     
        if (bom.isIsPlaygame()) {           
             sp.MoveDown();    
             vachamItemHp();
        }
        
    }
    @FXML public void ClickJFXButtonLEFT(MouseEvent event) {    
        if (bom.isIsPlaygame()) {
             sp.MoveLeft();    
             vachamItemHp();
        }
        
    }
    @FXML public void ClickJFXButtonRIGHT(MouseEvent event) {     
        if (bom.isIsPlaygame()) {
             sp.MoveRight();   
             vachamItemHp();
        }
        
    }
    
    @FXML public void MoveBoard(KeyEvent event) {
        if (bom.isIsPlaygame()) {
             if (event.getCode() == KeyCode.W) {                    
                  sp.MoveUp();    
                  vachamItemHp();
            }
            if (event.getCode() == KeyCode.S) {               
                    sp.MoveDown();
                    vachamItemHp();
            }
            if (event.getCode() == KeyCode.A) {               
                    sp.MoveLeft();
                    vachamItemHp();
            }
            if (event.getCode() == KeyCode.D) {              
                     sp.MoveRight(); 
                     vachamItemHp();
            }           
            
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
        if (bom.isIsPlaygame()) {    
            if (bom.getdBoomNumber() < bom.getBoomNumber()) {
                bom.setdBoomNumber(bom.getdBoomNumber() + 1);
                bom.AniBom();
                String s = "sound/BOM_SET.wav";
                playsound.PlayMusic(s); 
            }          
        }                     
    }
    
    @FXML public void OnMouseEntered(MouseEvent event) {
         ImageViewBom.setOpacity(.5);
    }
    @FXML public void OnMouseExited(MouseEvent event) {
         ImageViewBom.setOpacity(1);
    }     
    @FXML public void ClickButtonPlayagain() {
        if (ButtonPlayAgain.getOpacity() == 1) {
             startgame();     
        }
    }
    Stage stage;
    public void ClickButtonExit(ActionEvent event) {
        if (ButtonExit.getOpacity() == 1) {
            stage = (Stage) ((Button) event.getSource()).getScene().getWindow();
            stage.close();
        }      
    }

    /**
     * Initializes the controller class.
     * @param url
     * @param rb
     */
    @Override
    public void initialize(URL url, ResourceBundle rb) {
        String s = "sound/soundtrack.wav";
        playsound.PlayMusic(s);
        initImage();
        initSprite();
        initImageViewBoom();
        initArrImageViewRock();
        insertImageViewRock();
        initImageViewItemHp();
        HidePaneResult();
        AnimationTimer aniRock1 = new TimerRotateRock1();
        aniRock1.start();
        AnimationTimer aniRock3 = new TimeRock3Move();
        aniRock3.start();
        image.insertimage("IMAGE/background.png", ImageViewBackground);
        image.insertimage("IMAGE/bom/bom.png", ImageViewBom);
    }    
    
    private void initArrImageViewRock() {
        ArrImageViewRock[0] = ImageViewRock1; ArrImageViewRock[1] = ImageViewRock2; ArrImageViewRock[2] = ImageViewRock3; 
        ArrImageViewRock[3] = ImageViewRock4; ArrImageViewRock[4] = ImageViewRock5;        
    }
    
    private void initImage() {
        ImageViewMap[3][3] = ImageViewWall1; ImageViewMap[5][3] = ImageViewWall2; ImageViewMap[7][3] = ImageViewWall3; 
        ImageViewMap[9][3] = ImageViewWall4;ImageViewMap[11][3] = ImageViewWall5;
        ImageViewMap[3][5] = ImageViewWall6; ImageViewMap[5][5] = ImageViewWall7; ImageViewMap[7][5] = ImageViewWall8; 
        ImageViewMap[9][5] = ImageViewWall9;ImageViewMap[11][5] = ImageViewWall10;
        ImageViewMap[3][7] = ImageViewWall11; ImageViewMap[5][7] = ImageViewWall12; ImageViewMap[7][7] = ImageViewWall13; 
        ImageViewMap[9][7] = ImageViewWall14;ImageViewMap[11][7] = ImageViewWall15;
        ImageViewMap[3][9] = ImageViewWall16; ImageViewMap[5][9] = ImageViewWall17; ImageViewMap[7][9] = ImageViewWall18; 
        ImageViewMap[9][9] = ImageViewWall19;ImageViewMap[11][9] = ImageViewWall20;
        ImageViewMap[3][11] = ImageViewWall21; ImageViewMap[5][11] = ImageViewWall22; ImageViewMap[7][11] = ImageViewWall23; 
        ImageViewMap[9][11] = ImageViewWall24;ImageViewMap[11][11] = ImageViewWall25;
        ImageViewMap[3][13] = ImageViewWall26; ImageViewMap[5][13] = ImageViewWall27; ImageViewMap[7][13] = ImageViewWall28; 
        ImageViewMap[9][13] = ImageViewWall29;ImageViewMap[11][13] = ImageViewWall30;
        ImageViewMap[3][15] = ImageViewWall31; ImageViewMap[5][15] = ImageViewWall32; ImageViewMap[7][15] = ImageViewWall33; 
        ImageViewMap[9][15] = ImageViewWall34;ImageViewMap[11][15] = ImageViewWall35;
        ImageViewMap[3][17] = ImageViewWall36; ImageViewMap[5][17] = ImageViewWall37; ImageViewMap[7][17] = ImageViewWall38; 
        ImageViewMap[9][17] = ImageViewWall39;ImageViewMap[11][17] = ImageViewWall40;
        ImageViewMap[3][19] = ImageViewWall41; ImageViewMap[5][19] = ImageViewWall42; ImageViewMap[7][19] = ImageViewWall43; 
        ImageViewMap[9][19] = ImageViewWall44;ImageViewMap[11][19] = ImageViewWall45;
        
        
        ImageViewMap[3][2] = ImageViewBox1; ImageViewMap[7][2] = ImageViewBox2; ImageViewMap[11][2] = ImageViewBox3;        
        ImageViewMap[3][4] = ImageViewBox4; ImageViewMap[7][4] = ImageViewBox5; ImageViewMap[11][4] = ImageViewBox6;      
        ImageViewMap[3][6] = ImageViewBox7;  ImageViewMap[7][6] = ImageViewBox8; ImageViewMap[11][6] = ImageViewBox9;       
        ImageViewMap[3][8] = ImageViewBox10; ImageViewMap[7][8] = ImageViewBox11; ImageViewMap[11][8] = ImageViewBox12; 
        ImageViewMap[3][10] = ImageViewBox13; ImageViewMap[7][10] = ImageViewBox14; ImageViewMap[11][10] = ImageViewBox15;        
        ImageViewMap[3][12] = ImageViewBox16; ImageViewMap[7][12] = ImageViewBox17; ImageViewMap[11][12] = ImageViewBox18;
        ImageViewMap[3][14] = ImageViewBox19; ImageViewMap[7][14] = ImageViewBox20; ImageViewMap[11][14] = ImageViewBox21; 
        ImageViewMap[3][16] = ImageViewBox22; ImageViewMap[7][16] = ImageViewBox23; ImageViewMap[11][16] = ImageViewBox24;     
        ImageViewMap[3][18] = ImageViewBox25; ImageViewMap[7][18] = ImageViewBox26; ImageViewMap[11][18] = ImageViewBox27; 
        ImageViewMap[3][20] = ImageViewBox28; ImageViewMap[7][20] = ImageViewBox29; ImageViewMap[11][20] = ImageViewBox30; 
        
        
        ArrImageViewFire1[0] = ImageViewFireCenter; ArrImageViewFire1[1] = ImageViewFireLeft;
        ArrImageViewFire1[2] = ImageViewFireRight; ArrImageViewFire1[3] = ImageViewFireUp;
        ArrImageViewFire1[4] = ImageViewFireDown;
        
        for(int i = 1; i <= 13; i++) {
            for(int j = 1; j <= 20; j++) {
                if (map[i][j] == 1 && (i != 1 && i != 13 && j != 1 && j != 20)) {
                    image.insertimage("IMAGE/item_win.gif", ImageViewMap[i][j]);
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
    
    private void initSprite() {
        sp.LoadImage("IMAGE/sprite/down1.png", ImageViewSprite);
        ImageViewSprite.setLayoutX(53); ImageViewSprite.setLayoutY(45); 
        sp.setImageViewSprite(ImageViewSprite);
        sp.setMap(map);
        sp.setfps(30);
        sp.setPaneBackGround(PaneResult);
        sp.setLevel(1);
    }
    
    private void initImageViewBoom() {
        bom.setImageViewBom(ImageViewBom1);
        bom.setImageViewSprite(ImageViewSprite);
        bom.setMap(map);
        bom.Destroy(bom.getImageViewBom());
           bom.setArrImageViewRock(ArrImageViewRock);
           bom.setImageViewMap(ImageViewMap);
           bom.setArrImageViewFire1(ArrImageViewFire1);
           bom.setSizeArrImageViewFire1(4);
           bom.setSizeArrImageViewRock(4);
           bom.setImageViewFireCenter(ImageViewFireCenter);
           bom.setImageViewFireDown1(ImageViewFireDown); 
           bom.setImageViewFireLeft1(ImageViewFireLeft); 
           bom.setImageViewFireRight1(ImageViewFireRight);
           bom.setImageViewFireUp1(ImageViewFireUp);
           bom.setMonterNumber(5);
           bom.setdBoomNumber(0);
           bom.setBoomNumber(1);
           bom.setPaneResult(PaneResult);
           bom.setTextResult(TextWin_Lose);
           bom.setButtonExit(ButtonExit); bom.setButtonLevel2(ButtonLevel_Next); bom.setButtonPlayAgain(ButtonPlayAgain);
           bom.setIsPlaygame(true);
           bom.setLevel(1);
    }
    
    private void initImageViewItemHp() {
        
        ItemHp.LoadImage("IMAGE/item/item_hp.png", ImageViewItemHp);      
        ImageViewItemHp.setOpacity(1);
        
        Random ran = new Random();
        int x = ran.nextInt(3);
        switch(x) {
            case 0:
                ImageViewItemHp.setLayoutX(855); ImageViewItemHp.setLayoutY(90);
                break;
            case 1:
                ImageViewItemHp.setLayoutX(45); ImageViewItemHp.setLayoutY(270);
                break;              
            case 2:
                ImageViewItemHp.setLayoutX(855); ImageViewItemHp.setLayoutY(450);
                break;
        }
                   
    }
    
    private void insertImageViewRock() {    
        rock1.LoadImage("IMAGE/enemy/enemy.png", ImageViewRock1);
        ImageViewRock1.setLayoutX(rock1.getdx());
        ImageViewRock1.setLayoutY(rock1.getdy());
        rock1.setMap(map); rock1.setimage(ImageViewRock1); 
        rock1.setIsPlaygame(true);
        rock2.LoadImage("IMAGE/enemy/enemy.png", ImageViewRock2);
        ImageViewRock2.setLayoutX(rock2.getdx());
        ImageViewRock2.setLayoutY(rock2.getdy());
        rock2.setMap(map); rock2.setimage(ImageViewRock2);
        rock2.setIsPlaygame(true);
        rock4.LoadImage("IMAGE/enemy/enemy.png", ImageViewRock4);
        ImageViewRock4.setLayoutX(rock4.getdx());
        ImageViewRock4.setLayoutY(rock4.getdy());
        rock4.setMap(map); rock4.setimage(ImageViewRock4);
        rock4.setIsPlaygame(true);
        rock5.LoadImage("IMAGE/enemy/enemy.png", ImageViewRock5);
        ImageViewRock5.setLayoutX(rock5.getdx());
        ImageViewRock5.setLayoutY(rock5.getdy());
        rock5.setMap(map); rock5.setimage(ImageViewRock5);
        rock5.setIsPlaygame(true);
        
        rock3.insertimage("IMAGE/enemy/enemy1.png", ImageViewRock3);
        ImageViewRock3.setLayoutX(rock3.getdx());
        ImageViewRock3.setLayoutY(rock3.getdy());
        rock3.setMap(map); rock3.setImageViewSprite(ImageViewSprite); rock3.setimage(ImageViewRock3);
     }
    
    private class TimerRotateRock1 extends AnimationTimer {
        
        @Override
        public void handle(long now) {    
            
            if (bom.isIsPlaygame()) {           
                // XU LI VA CHAM CUA NHAN VAT VOI ENEMY
             if (rock1.vacham(ImageViewSprite, ImageViewRock1) || rock1.vacham(ImageViewSprite, ImageViewRock2) || rock1.vacham(ImageViewSprite, ImageViewRock3)
                     || rock1.vacham(ImageViewSprite, ImageViewRock4) || rock1.vacham(ImageViewSprite, ImageViewRock5)) {
                          bom.setIsPlaygame(false);
                          endgame();  
             }
             rock1.Move(); rock2.Move();  rock4.Move(); rock5.Move();
            }
        }
        
    }
    
    public void endgame() {
        if (bom.getMonterNumber() == 0) {
            TextWin_Lose.setText("WIN");
            ButtonLevel_Next.setOpacity(1);
            ButtonPlayAgain.setOpacity(0); ButtonExit.setOpacity(0);           
            String s = "sound/CRYST_UP.wav";
            playsound.PlayMusic(s);
        } else {
            TextWin_Lose.setText("LOSE");
            ButtonLevel_Next.setOpacity(0);
            ButtonPlayAgain.setOpacity(1); ButtonExit.setOpacity(1);
            String s = "sound/endgame3.wav";
            playsound.PlayMusic(s);
        }             
        PaneResult.setVisible(true);  
    }
    private void vachamItemHp() {
        if (sp.vacham(ImageViewSprite, ImageViewItemHp) && bom.getMonterNumber() == 0) {
            bom.setIsPlaygame(false);
            ShowPaneResult();
            endgame();
            ItemHp.Destroy(ItemHp.getimage());
            String s = "sound/Item.wav";
            playsound.PlayMusic(s);
        }     
    }
    private void ShowPaneResult() {
        PaneResult.setVisible(true);
    }
    
    private void HidePaneResult() {
        PaneResult.setVisible(false);
    }
    private class TimeRock3Move extends AnimationTimer {
        int dem = 0, dem1 = 0;
        Random ran = new Random();
        int random = ran.nextInt(30) + 30;
        @Override
        public void handle(long now) {
              dem ++; dem1++;
              if (dem == random) {
                  rock3.Move();
                  if (rock3.vacham(ImageViewSprite, ImageViewRock3)) {
                      bom.setIsPlaygame(false);
                      endgame();
                  }
                  dem = 0;
              }                   
        }
        
    }
    
    public void startgame() {
        ImageViewSprite.setOpacity(1); 
        ImageViewSprite.setLayoutX(53); ImageViewSprite.setLayoutY(45);  
        if (ImageViewBom1.getOpacity() == 1) {
            ImageViewBom1.setOpacity(0);             
        }
        HidePaneResult();
    
        String s = "sound/soundtrack.wav";
        playsound.PlayMusic(s);
        bom.setKhoangCachNo(1);
        int i,j;
        for(i = 1; i <= 13; i++) {
            for(j = 1; j <= 20; j++)
                map[i][j] = map1[i][j];              
        }
        for(i = 1; i <= 13; i++) {
            for(j = 1; j <= 20; j++)
                if (map[i][j] == 2) {
                   if (ImageViewMap[i][j].getOpacity() == 0) {
                     ImageViewMap[i][j].setOpacity(1);
                   }
                }          
        }
        for(i = 0; i <= 4; i++) {
            if (ArrImageViewRock[i].getOpacity() == 0) {
                ArrImageViewRock[i].setOpacity(1);
            }
        }      
        bom.destroyImageViewFire();
        initImage();
        insertImageViewRock();    
     bom.setIsPlaygame(true);
    }
}
