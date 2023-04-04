#include <iostream>
#include <SDL.h>
#include<time.h>
#include "window.h"
#include <vector>
#include <cmath>
#include<SDL_image.h>
#include<SDL_mixer.h>
#include<SDL_ttf.h>
using namespace std;

const int SCREEN_WIDTH = 800;
const int SCREEN_HEIGHT = 700;

Mix_Chunk* bong_gach=nullptr;
Mix_Chunk* bong_van=nullptr;
Mix_Chunk* game_over=nullptr;
Mix_Chunk* nhac_win=nullptr;
Mix_Chunk* nhac_nen_0=nullptr;

/*
Mix_Chunk* nhac_nen_1=nullptr;
Mix_Chunk* nhac_nen_2=nullptr;
Mix_Chunk* nhac_nen_3=nullptr;
Mix_Chunk* nhac_nen_4=nullptr;
*/
const char WINDOW_TITLE[] = "GAME_PONG";

bool va_cham(int gach_x, int gach_y, int gach_w, int gach_h,int  bong_x,int  bong_y,int bong_w,int bong_h, int& bong_step_x, int& bong_step_y){
        if (bong_x+bong_w>= gach_x && bong_x<=gach_x+gach_w &&
            (  (bong_y+bong_h>=gach_y && bong_y+bong_h<=gach_y+5) || (bong_y>=gach_y+gach_h && bong_y<=gach_y+gach_h+5)  )) {
            bong_step_y=-bong_step_y;

            return true;
        }
         if(bong_y+bong_h>=gach_y && bong_y<=gach_y+gach_h &&
             (  (bong_x+bong_w>= gach_x && bong_x+bong_w<=gach_x+5 ) || (bong_x<=gach_x+gach_w && bong_x>=gach_x+70)  )){
                bong_step_x=-bong_step_x;

                return true;
            }
            return false;

}

int main(int argc, char* argv[])
{
    SDL_Window* window;
    SDL_Renderer* renderer;
    SDL_Surface* surface;
    bool bong_run=true;
    int so_hang=10,so_cot=10,h=20,w=50,i,j,x,y;
    int vi_tri_y[so_hang][so_cot], vi_tri_x[so_hang][so_cot], so_box=3, danhdau[so_hang][so_cot], mang_gach[so_hang][so_cot];
    int van1_x=200, van1_y=670, bong_step_x=4, bong_step_y=4, bong_x, bong_y, time_gach=0, so_gach_pha=0, so_nhac_nen , so_hinh_nen;
    srand((int) time(NULL));
    bong_x=rand()%700+50;  bong_y=rand()%50+500;
    so_nhac_nen=rand()%4; so_hinh_nen=rand()%3;

    initSDL(window, renderer, SCREEN_WIDTH, SCREEN_HEIGHT, WINDOW_TITLE);

    SDL_Texture* gach[so_hang][so_cot];
    SDL_Texture* nen1=nullptr;
    SDL_Texture* nen2=nullptr;
    SDL_Texture* nen3=nullptr;
   SDL_Texture* van1=nullptr;
   SDL_Texture* bong=nullptr;
   SDL_Texture* nen_start=nullptr;
   SDL_Texture* nen_choi_lai=nullptr;
   for(i=0;i<so_hang;i++)
    for(j=0;j<so_cot;j++)
     danhdau[i][j]=0;

   //nen1=loadTexturepng("images/bgr_nen_1.png",renderer);
   nen2=loadTexturepng("images/bgr_nen_2.png",renderer);
   //nen3=loadTexturepng("images/bgr_nen_3.png",renderer);

    van1=loadTexturepng("images/van.png",renderer);
    bong=loadTexturepng("images/bong_1.png",renderer);
    nen_choi_lai=loadTexturepng("images/bgr_choi_lai.png", renderer);

      if(Mix_OpenAudio(22050,MIX_DEFAULT_FORMAT,0,4096)==-1){
            cout<<"LOI MO AM THANH"<<endl;
        return false;
      }

      bong_gach=Mix_LoadWAV("sounds/bom.wav");
      bong_van=Mix_LoadWAV("sounds/1.wav");
      game_over=Mix_LoadWAV("sounds/min_no.wav");
      nhac_nen_0= Mix_LoadWAV("sounds/nhac_nen.wav");

      nhac_win=Mix_LoadWAV("sounds/piano.wav");
   for(i=0;i<3;i++){
      for(j=0;j<so_cot;j++){
          gach[i][j]=loadTexturepng("images/gach_button_5.png",renderer);
          mang_gach[i][j]=3;
      }
   }
   for(i=3;i<6;i++){
      for(j=0;j<so_cot;j++){
          gach[i][j]=loadTexturepng("images/gach_button_4.png",renderer);
          mang_gach[i][j]=2;
      }
   }
   for(i=6;i<so_hang;i++){
      for(j=0;j<so_cot;j++){
          gach[i][j]=loadTexturepng("images/gach_button_6.png",renderer);
          mang_gach[i][j]=1;
      }
   }

   vi_tri_x[0][0]=3; vi_tri_y[0][0]=2;
   for(j=1;j<so_cot;j++){
        vi_tri_x[0][j]= vi_tri_x[0][j-1]+80;
        vi_tri_y[0][j]= 2;
   }
    for(i=1;i<so_hang;i++){
      for(j=0;j<so_cot;j++){
           vi_tri_x[i][j]= vi_tri_x[i-1][j];
           vi_tri_y[i][j]=vi_tri_y[i-1][j]+35;
      }
   }

    SDL_Event e;
    SDL_Event start;
    bool running = false;
    bool is_nen_start=true;
    nen_start= loadTexturepng("images/bgr_start_1.png",renderer);
      while(is_nen_start){
            SDL_Delay(1);
           SDL_RenderClear(renderer);
           renderTexture(nen_start,renderer,0,0,800,700);
          SDL_UpdateWindowSurface(window);
          while(SDL_PollEvent(&start)){
              if(start.type==SDL_QUIT){
                  SDL_Quit();
              }
              if(start.type==SDL_MOUSEBUTTONDOWN){
                  SDL_DestroyTexture(nen_start);
                 is_nen_start=false;
                running=true;
              }
          }
      }


    while (running) {
        SDL_Delay(1);
        SDL_RenderClear(renderer);
        renderTexture(nen2, renderer,0,0,800,700);

        renderTexture(van1, renderer,van1_x,van1_y,120,30);
        renderTexture(bong, renderer,bong_x,bong_y,20,20);

        for(i=0;i<so_hang;i++){
         for(j=0;j<so_cot;j++){
           renderTexture(gach[i][j],renderer,vi_tri_x[i][j],vi_tri_y[i][j],75,30);
      }
   }

       SDL_UpdateWindowSurface(window);

     // CHUYEN DONG CUA BONG
    if (bong_run) { bong_x-=bong_step_x; bong_y-=bong_step_y;   }

          // VA CHAM BIEN
     if (bong_x<=0|| bong_x+20>=800) bong_step_x=-bong_step_x;
     if (bong_y<=0||(bong_x+20>=van1_x && bong_x<=van1_x+120 && bong_y+20 >=van1_y && bong_y+20<=van1_y+5)) {
            bong_step_y=-bong_step_y;
     }
     // GAME PAUSE
     if(bong_y>=680) {
        Mix_PlayChannel(-1,game_over,0);
        bong_run=false;
     }

     // GACH DI CHUYEN
     time_gach++;
if(bong_run){

   for(i=0;i<so_hang;i++){
      for(j=0;j<so_cot;j++){
              if(time_gach==2000)     vi_tri_y[i][j]+=40;
              if( danhdau[i][j]==0 && va_cham(vi_tri_x[i][j],vi_tri_y[i][j],75,30,bong_x,bong_y,20,20,bong_step_x, bong_step_y)) {
                    mang_gach[i][j]--;
                   if (mang_gach[i][j]==0){
                Mix_PlayChannel(-1, bong_gach, 0);
                 so_gach_pha++;
                // cout<<"SO GACH PHA LA: "<<so_gach_pha<<endl;
                  SDL_DestroyTexture(gach[i][j]);
                  danhdau[i][j]=1;
                    }

                }
                // GAME OVER
            if (vi_tri_y[i][j]+30>= van1_y && danhdau[i][j]==0) {
                            running=false;
                            Mix_PlayChannel(-1,game_over,0);

                     }

               }
           }

    if(time_gach>=2000) time_gach=0;

     }
         // GAME WIN
if(so_gach_pha==100){
       Mix_PlayChannel(-1,nhac_win,0);
         bong_run=false;
       }

while (SDL_PollEvent(&e)) {
            if (e.type == SDL_QUIT) {
                running = false;
                break;
            }
            if (e.type == SDL_KEYDOWN) {
                if (e.key.keysym.sym == SDLK_ESCAPE) running = false;
                break;
            }
            if (e.type== SDL_MOUSEMOTION){
                 if(bong_run)   van1_x=e.motion.x-60;
            }
        }

    }
  if (so_hinh_nen==0)   SDL_DestroyTexture(nen1);
  if (so_hinh_nen==1)   SDL_DestroyTexture(nen2);
  if (so_hinh_nen==2)   SDL_DestroyTexture(nen3);
    SDL_DestroyTexture(nen_choi_lai);
    SDL_DestroyTexture(van1);
    SDL_DestroyTexture(bong);
    SDL_DestroyTexture(nen_start);
     for(i=0;i<so_hang;i++){
      for(j=0;j<so_cot;j++){
          SDL_DestroyTexture(gach[i][j]);
      }
   }
    quitSDL(window, renderer);
    return 0;
}
