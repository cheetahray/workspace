#import "HWPHello.h"

#define kLowNote  48
#define kHighNote 72
#define kMidNote  60

@interface HWPHello ()

@property (readwrite) AudioUnit samplerUnit;

@end

@implementation HWPHello
{
    // Regular C implementation:
    char * messageToSend;
    struct sockaddr_in broadcastAddr;
    int DatagramSocketC;
    Boolean successInitializingTransmitter;
    Boolean successInitializingReceiver;
    Boolean midisuccess;
}

@synthesize samplerUnit         = _samplerUnit;

void MyMIDINotifyProc (const MIDINotification  *message, void *refCon) {
    printf("MIDI Notify, messageId=%d,", (int)message->messageID);
}

static void MyMIDIReadProc(const MIDIPacketList *pktlist,
                           void *refCon,
                           void *connRefCon) {
    
    
    //AudioUnit *player = (AudioUnit*) refCon;
    ssize_t result = 0;
    MIDIPacket *packet = (MIDIPacket *)pktlist->packet;
    for (int i=0; i < pktlist->numPackets; i++) {
        Byte midiStatus = packet->data[0];
        Byte midiCommand = midiStatus >> 4;
        
        
        if (midiCommand == 0x09) {
            Byte note = packet->data[1] & 0x7F;
            Byte velocity = packet->data[2] & 0x7F;
            
            int noteNumber = ((int) note) % 12;
            NSString *noteType;
            switch (noteNumber) {
                case 0:
                    noteType = @"C";
                    break;
                case 1:
                    noteType = @"C#";
                    break;
                case 2:
                    noteType = @"D";
                    break;
                case 3:
                    noteType = @"D#";
                    break;
                case 4:
                    noteType = @"E";
                    break;
                case 5:
                    noteType = @"F";
                    break;
                case 6:
                    noteType = @"F#";
                    break;
                case 7:
                    noteType = @"G";
                    break;
                case 8:
                    noteType = @"G#";
                    break;
                case 9:
                    noteType = @"A";
                    break;
                case 10:
                    noteType = @"Bb";
                    break;
                case 11:
                    noteType = @"B";
                    break;
                default:
                    break;
            }
            //NSLog([noteType stringByAppendingFormat:[NSString stringWithFormat:@": %i", noteNumber]]);
            
            //OSStatus result = noErr;
            //result = MusicDeviceMIDIEvent (player, midiStatus, note, velocity, 0);
        }
        packet = MIDIPacketNext(packet);
    }
}

- (void) sendmidi:(NSString *)noteType
{
    ssize_t result = 0;
    if (successInitializingTransmitter) {
        result = sendto(DatagramSocketC, (__bridge const void *)(noteType), strlen((__bridge const void *)noteType), 0, (struct sockaddr*)&broadcastAddr, sizeof broadcastAddr);
    }
}

// Initializer for the packet and socket, takes a desination IP address and socket number
- (void) initialize:(CDVInvokedUrlCommand*)command
{
    [self.commandDelegate runInBackground:^{
        CDVPluginResult* pluginResult = nil;
        successInitializingTransmitter = false;
        // Allocate the memory
        memset(&broadcastAddr, 0, sizeof broadcastAddr);
        broadcastAddr.sin_family = AF_INET;
        midisuccess = false;
        // Set the destination IP address
        const char * ip_address_or_url = ((NSString *)[command.arguments objectAtIndex:0]).cString;
        // First, assume it's a ddd.ddd.ddd.ddd address
        int result = inet_pton(AF_INET, ip_address_or_url, &broadcastAddr.sin_addr); // Set the broadcast IP address
        // If that failed, it might be in www.xxxyyyzzz.com domain name format
        if (result != 1) { // 1 = SUCCESS
            // Resolve host name to IP address
            struct hostent *host_entry = gethostbyname(ip_address_or_url);
            // If we were able to resolve the IP address from the host name, we're good to initialize
            if (host_entry != nil) {
                
                // Extract the ddd.ddd.ddd.ddd entry from the host_entry
                char *ip_address_from_url;
                ip_address_from_url = inet_ntoa(*((struct in_addr *)host_entry->h_addr_list[0]));
                
                // Convert ddd.ddd.ddd.ddd to binary form
                result = inet_pton(AF_INET, ip_address_from_url, &broadcastAddr.sin_addr);
            }
        }
        
        // If we could resolve it
        if (result == 1) {
            
            // Set the destination port #
            NSUInteger thePort = [[command.arguments objectAtIndex:1] integerValue];
            broadcastAddr.sin_port = htons(thePort); // Set port, e.g., 4445
            
            // 	Create the socket
            DatagramSocketC = socket(PF_INET, SOCK_DGRAM, IPPROTO_UDP);
            int broadcastEnable=1;
            setsockopt(DatagramSocketC, SOL_SOCKET, SO_BROADCAST, &broadcastEnable, sizeof(broadcastEnable));
            
            successInitializingTransmitter = true;
        }
        
        //NSString* socket = [NSString stringWithFormat:@"%i", DatagramSocketC];
        if (DatagramSocketC != 0 && successInitializingTransmitter)
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:[@": " stringByAppendingString:(NSString *)[command.arguments objectAtIndex:0]]];
        else
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:[@": " stringByAppendingString:(NSString *)[command.arguments objectAtIndex:0]]];
        
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }];
}

- (void)listenForPackets:(CDVInvokedUrlCommand*)command
{
    
    [self.commandDelegate runInBackground:^{
        CDVPluginResult* pluginResult = nil;
        NSString* err = nil;
        NSString *msg = nil;
        void *buf = nil;
        int listeningSocket = socket(PF_INET, SOCK_DGRAM, IPPROTO_UDP);
        if (listeningSocket <= 0) {
            err = [NSString stringWithFormat:@"Error: listenForPackets - socket() failed."];
            successInitializingReceiver = false;//return;
        }
        else
        {
            // set timeout to 2 seconds.
            struct timeval timeV;
            timeV.tv_sec = 0;
            timeV.tv_usec = 125000;
            
            if (setsockopt(listeningSocket, SOL_SOCKET, SO_RCVTIMEO, &timeV, sizeof(timeV)) == -1)
            {
                err = [NSString stringWithFormat:@"Error: listenForPackets - setsockopt failed"];
                close(listeningSocket);
                successInitializingReceiver = false;
            }
            else
            {
                // bind the port
                struct sockaddr_in sockaddr;
                memset(&sockaddr, 0, sizeof(sockaddr));
                
                sockaddr.sin_len = sizeof(sockaddr);
                sockaddr.sin_family = AF_INET;
                sockaddr.sin_port = htons(8888);
                sockaddr.sin_addr.s_addr = htonl(INADDR_ANY);
                
                int status = bind(listeningSocket, (struct sockaddr *)&sockaddr, sizeof(sockaddr));
                if (status == -1) {
                    close(listeningSocket);
                    err = [NSString stringWithFormat:@"Error: listenForPackets - bind() failed."];
                    successInitializingReceiver = false;
                }
                else
                {
                    // receive
                    struct sockaddr_in receiveSockaddr;
                    socklen_t receiveSockaddrLen = sizeof(receiveSockaddr);
                    
                    size_t bufSize = 512;
                    buf = malloc(bufSize);
                    ssize_t result = recvfrom(listeningSocket, buf, bufSize, 0, (struct sockaddr *)&receiveSockaddr, &receiveSockaddrLen);
                    
                    NSData *data = nil;
                    
                    if (result > 0)
                    {
                        if ((size_t)result != bufSize)
                        {
                            buf = realloc(buf, result);
                        }
                        data = [NSData dataWithBytesNoCopy:buf length:result freeWhenDone:YES];
                        
                        char addrBuf[INET_ADDRSTRLEN];
                        if (inet_ntop(AF_INET, &receiveSockaddr.sin_addr, addrBuf, (size_t)sizeof(addrBuf)) == NULL)
                        {
                            addrBuf[0] = '\0';
                        }
                        
                        //NSString *address = [NSString stringWithCString:addrBuf encoding:NSASCIIStringEncoding];
                        msg = [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];
                        /*
                         dispatch_async(dispatch_get_main_queue(), ^{
                         [self didReceiveMessage:msg fromAddress:address];
                         });
                         */
                        successInitializingReceiver = true;
                    }
                    else
                    {
                        free(buf);
                        err = [NSString stringWithFormat:@"Error: listenForPackets - no packets."];
                        successInitializingReceiver = false;
                    }
                    close(listeningSocket);
                }
            }
        }
        if (successInitializingReceiver)
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:[@"" stringByAppendingString:msg]];
        else
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:[@"" stringByAppendingString:err]];
        
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }];
    
}

// Sends a message to the IP and port set up in the initializer
- (void) sendMessage:(CDVInvokedUrlCommand*)command
{
    [self.commandDelegate runInBackground:^{
        
        ssize_t result = 0;
        CDVPluginResult* pluginResult = nil;
        Boolean messageSent = false;
        
        // Only attempt to send a packet if the transmitter initialization was successful
        if (successInitializingTransmitter) {
            messageToSend = ((NSString *)[command.arguments objectAtIndex:0]).cString;
            result = sendto(DatagramSocketC, messageToSend, strlen(messageToSend), 0, (struct sockaddr*)&broadcastAddr, sizeof broadcastAddr);
            messageSent = true;
        }
        
        if (messageSent)
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:[@": " stringByAppendingString:(NSString *)[command.arguments objectAtIndex:0]]];
        else
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:[@": " stringByAppendingString:(NSString *)[command.arguments objectAtIndex:0]]];
        
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }];
}

// Sends a message to the IP and port set up in the initializer
- (void) playmidi:(CDVInvokedUrlCommand*)command
{
    [self.commandDelegate runInBackground:^{
        
        CDVPluginResult* pluginResult = nil;
        if(false == midisuccess)
        {
            OSStatus result = noErr;
            messageToSend = ((NSString *)[command.arguments objectAtIndex:0]).cString;
            
            // Create a client
            MIDIClientRef virtualMidi;
            result = MIDIClientCreate(CFSTR("Virtual Client"),
                                      MyMIDINotifyProc,
                                      NULL,
                                      &virtualMidi);
            
            NSAssert( result == noErr, @"MIDIClientCreate failed. Error code: %d '%.4s'", (int) result, (const char *)&result);
            
            // Create an endpoint
            MIDIEndpointRef virtualEndpoint;
            result = MIDIDestinationCreate(virtualMidi, @"Virtual Destination", MyMIDIReadProc, self.samplerUnit, &virtualEndpoint);
            
            NSAssert( result == noErr, @"MIDIDestinationCreate failed. Error code: %d '%.4s'", (int) result, (const char *)&result);
            
            // Create a new music sequence
            MusicSequence s;
            // Initialise the music sequence
            NewMusicSequence(&s);
            
            // Get a string to the path of the MIDI file which
            // should be located in the Resources folder
            NSString *midiFilePath = [[NSBundle mainBundle]
                                      pathForResource:@"simpletest"
                                      ofType:@"mid"];
            
            // Create a new URL which points to the MIDI file
            NSURL * midiFileURL = [NSURL fileURLWithPath:midiFilePath];
            
            
            MusicSequenceFileLoad(s, (__bridge CFURLRef) midiFileURL, 0, 0);
            
            // Create a new music player
            MusicPlayer  p;
            // Initialise the music player
            NewMusicPlayer(&p);
            
            // ************* Set the endpoint of the sequence to be our virtual endpoint
            MusicSequenceSetMIDIEndpoint(s, virtualEndpoint);
            
            // Load the sequence into the music player
            MusicPlayerSetSequence(p, s);
            // Called to do some MusicPlayer setup. This just
            // reduces latency when MusicPlayerStart is called
            MusicPlayerPreroll(p);
            // Starts the music playing
            MusicPlayerStart(p);
            
            // Get length of track so that we know how long to kill time for
            MusicTrack t;
            MusicTimeStamp len;
            UInt32 sz = sizeof(MusicTimeStamp);
            MusicSequenceGetIndTrack(s, 1, &t);
            MusicTrackGetProperty(t, kSequenceTrackProperty_TrackLength, &len, &sz);
            
            
            while (1) { // kill time until the music is over
                usleep (3 * 1000 * 1000);
                MusicTimeStamp now = 0;
                MusicPlayerGetTime (p, &now);
                if (now >= len)
                    break;
            }
            
            // Stop the player and dispose of the objects
            MusicPlayerStop(p);
            DisposeMusicSequence(s);
            DisposeMusicPlayer(p);
            
            
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:[@": " stringByAppendingString:(NSString *)[command.arguments objectAtIndex:0]]];
        }
        else
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:[@": " stringByAppendingString:(NSString *)[command.arguments objectAtIndex:0]]];
        
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }];
}

@end