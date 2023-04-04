#ifndef WINDOW_H_INCLUDED
#define WINDOW_H_INCLUDED
#include <iostream>
#include <SDL.h>
#include<SDL_image.h>
void logSDLError(std::ostream& os,const std::string &msg, bool fatal = false);
void initSDL(SDL_Window* &window, SDL_Renderer* &renderer,int screenWidth, int screenHeight, const char* windowTitle) ;
void quitSDL(SDL_Window* window, SDL_Renderer* renderer);
void waitUntilKeyPressed();
SDL_Texture* loadTexturepng(const std::string &file, SDL_Renderer *ren);
void renderTexture(SDL_Texture *tex, SDL_Renderer *ren, int x, int y, int w, int h);
#endif // WINDOW_H_INCLUDED
