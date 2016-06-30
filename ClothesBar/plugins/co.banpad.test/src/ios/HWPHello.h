#import <Cordova/CDV.h>
#import <AudioToolbox/MusicPlayer.h>
#import <CoreFoundation/CFSocket.h>
#include <CFNetwork/CFNetwork.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <netdb.h>

@interface HWPHello : CDVPlugin
- (void)sendmidi:(NSString *)noteType;
- (void)initialize:(CDVInvokedUrlCommand*)command;
- (void)sendMessage:(CDVInvokedUrlCommand*)command;
- (void)listenForPackets:(CDVInvokedUrlCommand*)command;
- (void)playmidi:(CDVInvokedUrlCommand*)command;
//+ (void)MyMIDIReadProc:(const MIDIPacketList *)pktlist withref:(void *)refCon withCon:(void *)connRefCon;
@end
