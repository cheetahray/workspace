#import "HWPHello.h"

#define kLowNote  48
#define kHighNote 72
#define kMidNote  60

@interface HWPHello ()

@property (readwrite) AudioUnit samplerUnit;
@property (readwrite) Boolean successInitializingTransmitter;
@property (readwrite) int DatagramSocketC;
@property (readwrite) struct sockaddr_in broadcastAddr;

@end

@implementation HWPHello
{
    // Regular C implementation:
    char * messageToSend;
    Boolean successInitializingReceiver;
    Boolean midisuccess;
    // Create a client
    MIDIClientRef virtualMidi1;
    MIDIClientRef virtualMidi2;
    MIDIClientRef virtualMidi3;
    MIDIClientRef virtualMidi4;
    MIDIClientRef virtualMidi5;
    MIDIClientRef virtualMidi6;
    MIDIClientRef virtualMidi7;
    MIDIClientRef virtualMidi8;
    // Create an endpoint
    MIDIEndpointRef virtualEndpoint1;
    MIDIEndpointRef virtualEndpoint2;
    MIDIEndpointRef virtualEndpoint3;
    MIDIEndpointRef virtualEndpoint4;
    MIDIEndpointRef virtualEndpoint5;
    MIDIEndpointRef virtualEndpoint6;
    MIDIEndpointRef virtualEndpoint7;
    MIDIEndpointRef virtualEndpoint8;
    // Create a new music sequence
    MusicSequence s1;
    MusicSequence s2;
    MusicSequence s3;
    MusicSequence s4;
    MusicSequence s5;
    MusicSequence s6;
    MusicSequence s7;
    MusicSequence s8;
}

@synthesize samplerUnit;
@synthesize successInitializingTransmitter;
@synthesize DatagramSocketC;
@synthesize broadcastAddr;

void MyMIDINotifyProc (const MIDINotification  *message, void *refCon) {
    printf("MIDI Notify, messageId=%d,", (int)message->messageID);
}

static HWPHello *myclass;

static void MyMIDIReadProc(const MIDIPacketList *pktlist,
                           void *refCon,
                           void *connRefCon) {
    
    
    //AudioUnit *player = (AudioUnit*) refCon;
    Boolean gottogo = false;
    MIDIPacket *packet = (MIDIPacket *)pktlist->packet;
    for (int i=0; i < pktlist->numPackets; i++) {
        Byte midiStatus = packet->data[0];
        Byte midiCommand = midiStatus >> 4;
        
        
        if (midiCommand == 0x09) {
            Byte note = packet->data[1] & 0x7F;
            Byte velocity = packet->data[2] & 0x7F;
            
            //int noteNumber = ((int) note) % 12;
            NSString *noteType;
            switch ((int)note) {
                case 84:
                    noteType = @"127";
                    gottogo = true;
                    break;
                case 85:
                    noteType = @"C#";
                    gottogo = false;
                    break;
                case 86:
                    noteType = @"143";
                    gottogo = true;
                    break;
                case 87:
                    noteType = @"D#";
                    gottogo = false;
                    break;
                case 88:
                    noteType = @"159";
                    gottogo = true;
                    break;
                case 89:
                    noteType = @"175";
                    gottogo = true;
                    break;
                case 90:
                    noteType = @"F#";
                    gottogo = false;
                    break;
                case 91:
                    noteType = @"191";
                    gottogo = true;
                    break;
                case 92:
                    noteType = @"G#";
                    gottogo = false;
                    break;
                case 93:
                    noteType = @"207";
                    gottogo = true;
                    break;
                case 94:
                    noteType = @"A#";
                    gottogo = false;
                    break;
                case 95:
                    noteType = @"223";
                    gottogo = true;
                    break;
                case 96:
                    noteType = @"239";
                    gottogo = true;
                    break;
                default:
                    break;
            }
            if((int)velocity > 0)
            {
                //NSLog([noteType stringByAppendingFormat:[NSString stringWithFormat:@": %i", ((int) note)]]);
                ssize_t result = 0;
                if (myclass->successInitializingTransmitter) {
                    if(true == gottogo)
                    {
                        result = sendto(myclass->DatagramSocketC, noteType.cString, strlen(noteType.cString), 0, (struct sockaddr*)&(myclass->broadcastAddr), sizeof myclass->broadcastAddr);
                    }
                }
            }
            //OSStatus result = noErr;
            //result = MusicDeviceMIDIEvent (player, midiStatus, note, velocity, 0);
        }
        packet = MIDIPacketNext(packet);
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
            bool success;
            // 	Create the socket
            DatagramSocketC = socket(PF_INET, SOCK_DGRAM, IPPROTO_UDP);
            int broadcastEnable=1;
            success = setsockopt(DatagramSocketC, SOL_SOCKET, SO_BROADCAST, &broadcastEnable, sizeof(broadcastEnable)) == 0;
            NSAssert(success, @"Network setting is error.");
            successInitializingTransmitter = true;
        }
        myclass = self;
        
        result = MIDIClientCreate(CFSTR("Virtual Client"),
                                  MyMIDINotifyProc,
                                  NULL,
                                  &virtualMidi1);
        NSAssert( result == noErr, @"MIDIClientCreate failed. Error code: %d '%.4s'", (int) result, (const char *)&result);
        result = MIDIClientCreate(CFSTR("Virtual Client"),
                                  MyMIDINotifyProc,
                                  NULL,
                                  &virtualMidi2);
        NSAssert( result == noErr, @"MIDIClientCreate failed. Error code: %d '%.4s'", (int) result, (const char *)&result);
        result = MIDIClientCreate(CFSTR("Virtual Client"),
                                  MyMIDINotifyProc,
                                  NULL,
                                  &virtualMidi3);
        NSAssert( result == noErr, @"MIDIClientCreate failed. Error code: %d '%.4s'", (int) result, (const char *)&result);
        result = MIDIClientCreate(CFSTR("Virtual Client"),
                                  MyMIDINotifyProc,
                                  NULL,
                                  &virtualMidi4);
        NSAssert( result == noErr, @"MIDIClientCreate failed. Error code: %d '%.4s'", (int) result, (const char *)&result);
        result = MIDIClientCreate(CFSTR("Virtual Client"),
                                  MyMIDINotifyProc,
                                  NULL,
                                  &virtualMidi5);
        NSAssert( result == noErr, @"MIDIClientCreate failed. Error code: %d '%.4s'", (int) result, (const char *)&result);
        result = MIDIClientCreate(CFSTR("Virtual Client"),
                                  MyMIDINotifyProc,
                                  NULL,
                                  &virtualMidi6);
        NSAssert( result == noErr, @"MIDIClientCreate failed. Error code: %d '%.4s'", (int) result, (const char *)&result);
        result = MIDIClientCreate(CFSTR("Virtual Client"),
                                  MyMIDINotifyProc,
                                  NULL,
                                  &virtualMidi7);
        NSAssert( result == noErr, @"MIDIClientCreate failed. Error code: %d '%.4s'", (int) result, (const char *)&result);
        result = MIDIClientCreate(CFSTR("Virtual Client"),
                                  MyMIDINotifyProc,
                                  NULL,
                                  &virtualMidi8);
        NSAssert( result == noErr, @"MIDIClientCreate failed. Error code: %d '%.4s'", (int) result, (const char *)&result);
        
        
        result = MIDIDestinationCreate(virtualMidi1, @"Virtual Destination", MyMIDIReadProc, self.samplerUnit, &virtualEndpoint1);
        
        NSAssert( result == noErr, @"MIDIDestinationCreate failed. Error code: %d '%.4s'", (int) result, (const char *)&result);
        result = MIDIDestinationCreate(virtualMidi2, @"Virtual Destination", MyMIDIReadProc, self.samplerUnit, &virtualEndpoint2);
        
        NSAssert( result == noErr, @"MIDIDestinationCreate failed. Error code: %d '%.4s'", (int) result, (const char *)&result);
        result = MIDIDestinationCreate(virtualMidi3, @"Virtual Destination", MyMIDIReadProc, self.samplerUnit, &virtualEndpoint3);
        
        NSAssert( result == noErr, @"MIDIDestinationCreate failed. Error code: %d '%.4s'", (int) result, (const char *)&result);
        result = MIDIDestinationCreate(virtualMidi4, @"Virtual Destination", MyMIDIReadProc, self.samplerUnit, &virtualEndpoint4);
        
        NSAssert( result == noErr, @"MIDIDestinationCreate failed. Error code: %d '%.4s'", (int) result, (const char *)&result);
        result = MIDIDestinationCreate(virtualMidi5, @"Virtual Destination", MyMIDIReadProc, self.samplerUnit, &virtualEndpoint5);
        
        NSAssert( result == noErr, @"MIDIDestinationCreate failed. Error code: %d '%.4s'", (int) result, (const char *)&result);
        result = MIDIDestinationCreate(virtualMidi6, @"Virtual Destination", MyMIDIReadProc, self.samplerUnit, &virtualEndpoint6);
        
        NSAssert( result == noErr, @"MIDIDestinationCreate failed. Error code: %d '%.4s'", (int) result, (const char *)&result);
        result = MIDIDestinationCreate(virtualMidi7, @"Virtual Destination", MyMIDIReadProc, self.samplerUnit, &virtualEndpoint7);
        
        NSAssert( result == noErr, @"MIDIDestinationCreate failed. Error code: %d '%.4s'", (int) result, (const char *)&result);
        result = MIDIDestinationCreate(virtualMidi8, @"Virtual Destination", MyMIDIReadProc, self.samplerUnit, &virtualEndpoint8);
        
        NSAssert( result == noErr, @"MIDIDestinationCreate failed. Error code: %d '%.4s'", (int) result, (const char *)&result);
        
        // Initialise the music sequence
        NewMusicSequence(&s1);
        NewMusicSequence(&s2);
        NewMusicSequence(&s3);
        NewMusicSequence(&s4);
        NewMusicSequence(&s5);
        NewMusicSequence(&s6);
        NewMusicSequence(&s7);
        NewMusicSequence(&s8);
        
        // Get a string to the path of the MIDI file which
        // should be located in the Resources folder
        NSString *midiFilePath = [[NSBundle mainBundle]
                                  pathForResource:@"head2"
                                  ofType:@"mid"];
        // Create a new URL which points to the MIDI file
        NSURL * midiFileURL = [NSURL fileURLWithPath:midiFilePath];
        MusicSequenceFileLoad(s1, (__bridge CFURLRef) midiFileURL, 0, 0);
        
        // Get a string to the path of the MIDI file which
        // should be located in the Resources folder
        midiFilePath = [[NSBundle mainBundle]
                        pathForResource:@"frog"
                        ofType:@"mid"];
        // Create a new URL which points to the MIDI file
        midiFileURL = [NSURL fileURLWithPath:midiFilePath];
        MusicSequenceFileLoad(s2, (__bridge CFURLRef) midiFileURL, 0, 0);
        
        // Get a string to the path of the MIDI file which
        // should be located in the Resources folder
        midiFilePath = [[NSBundle mainBundle]
                        pathForResource:@"head"
                        ofType:@"mid"];
        // Create a new URL which points to the MIDI file
        midiFileURL = [NSURL fileURLWithPath:midiFilePath];
        MusicSequenceFileLoad(s3, (__bridge CFURLRef) midiFileURL, 0, 0);
        
        // Get a string to the path of the MIDI file which
        // should be located in the Resources folder
        midiFilePath = [[NSBundle mainBundle]
                        pathForResource:@"fish"
                        ofType:@"mid"];
        // Create a new URL which points to the MIDI file
        midiFileURL = [NSURL fileURLWithPath:midiFilePath];
        MusicSequenceFileLoad(s4, (__bridge CFURLRef) midiFileURL, 0, 0);
        
        // Get a string to the path of the MIDI file which
        // should be located in the Resources folder
        midiFilePath = [[NSBundle mainBundle]
                        pathForResource:@"tpchild1"
                        ofType:@"mid"];
        // Create a new URL which points to the MIDI file
        midiFileURL = [NSURL fileURLWithPath:midiFilePath];
        MusicSequenceFileLoad(s5, (__bridge CFURLRef) midiFileURL, 0, 0);
        
        // Get a string to the path of the MIDI file which
        // should be located in the Resources folder
        midiFilePath = [[NSBundle mainBundle]
                        pathForResource:@"bee"
                        ofType:@"mid"];
        // Create a new URL which points to the MIDI file
        midiFileURL = [NSURL fileURLWithPath:midiFilePath];
        MusicSequenceFileLoad(s6, (__bridge CFURLRef) midiFileURL, 0, 0);
        
        // Get a string to the path of the MIDI file which
        // should be located in the Resources folder
        midiFilePath = [[NSBundle mainBundle]
                        pathForResource:@"donkey"
                        ofType:@"mid"];
        // Create a new URL which points to the MIDI file
        midiFileURL = [NSURL fileURLWithPath:midiFilePath];
        MusicSequenceFileLoad(s7, (__bridge CFURLRef) midiFileURL, 0, 0);
        
        // Get a string to the path of the MIDI file which
        // should be located in the Resources folder
        midiFilePath = [[NSBundle mainBundle]
                        pathForResource:@"cuckoo"
                        ofType:@"mid"];
        // Create a new URL which points to the MIDI file
        midiFileURL = [NSURL fileURLWithPath:midiFilePath];
        MusicSequenceFileLoad(s8, (__bridge CFURLRef) midiFileURL, 0, 0);
        
        // ************* Set the endpoint of the sequence to be our virtual endpoint
        MusicSequenceSetMIDIEndpoint(s1, virtualEndpoint1);
        MusicSequenceSetMIDIEndpoint(s2, virtualEndpoint2);
        MusicSequenceSetMIDIEndpoint(s3, virtualEndpoint3);
        MusicSequenceSetMIDIEndpoint(s4, virtualEndpoint4);
        MusicSequenceSetMIDIEndpoint(s5, virtualEndpoint5);
        MusicSequenceSetMIDIEndpoint(s6, virtualEndpoint6);
        MusicSequenceSetMIDIEndpoint(s7, virtualEndpoint7);
        MusicSequenceSetMIDIEndpoint(s8, virtualEndpoint8);
        
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
            //OSStatus result = noErr;
            
            // Create a new music player
            MusicPlayer  p;
            // Initialise the music player
            NewMusicPlayer(&p);
            
            double len = 0.0;
            switch([(NSString *)[command.arguments objectAtIndex:0] intValue])
            {
                case 239:
                    len = 16.0;
                    // Load the sequence into the music player
                    MusicPlayerSetSequence(p, s1);
                    break;
                case 223:
                    len = 16.0;
                    // Load the sequence into the music player
                    MusicPlayerSetSequence(p, s2);
                    break;
                case 207:
                    len = 26.0;
                    // Load the sequence into the music player
                    MusicPlayerSetSequence(p, s3);
                    break;
                case 191:
                    len = 18.0;
                    // Load the sequence into the music player
                    MusicPlayerSetSequence(p, s4);
                    break;
                case 175:
                    len = 38.0;
                    // Load the sequence into the music player
                    MusicPlayerSetSequence(p, s5);
                    break;
                case 159:
                    len = 18.0;
                    // Load the sequence into the music player
                    MusicPlayerSetSequence(p, s6);
                    break;
                case 143:
                    len = 28.0;
                    // Load the sequence into the music player
                    MusicPlayerSetSequence(p, s7);
                    break;
                case 127:
                    len = 26.0;
                    // Load the sequence into the music player
                    MusicPlayerSetSequence(p, s8);
                    break;
                default:
                    len = 0.0;
                    // Load the sequence into the music player
                    MusicPlayerSetSequence(p, s1);
                    break;
            }
            
            // Called to do some MusicPlayer setup. This just
            // reduces latency when MusicPlayerStart is called
            MusicPlayerPreroll(p);
            // Starts the music playing
            MusicPlayerStart(p);
            
            // Get length of track so that we know how long to kill time for
            //MusicTrack t;
            //MusicTimeStamp len;
            //UInt32 sz = sizeof(MusicTimeStamp);
            //MusicSequenceGetIndTrack(s, 1, &t);
            //MusicTrackGetProperty(t, kSequenceTrackProperty_TrackLength, &len, &sz);
            NSDate *start = [NSDate date];
            NSTimeInterval timeInterval;
            midisuccess = true;
            while (1) { // kill time until the music is over
                usleep (1000000);
                timeInterval = [start timeIntervalSinceNow];
                //NSLog([NSString stringWithFormat:@": %f", timeInterval*-1]);
                if (0 > len + timeInterval)
                    break;
            }
            
            // Stop the player and dispose of the objects
            MusicPlayerStop(p);
            
            switch([(NSString *)[command.arguments objectAtIndex:0] intValue])
            {
                case 239:
                    DisposeMusicSequence(s1);
                    break;
                case 223:
                    DisposeMusicSequence(s2);
                    break;
                case 207:
                    DisposeMusicSequence(s3);
                    break;
                case 191:
                    DisposeMusicSequence(s4);
                    break;
                case 175:
                    DisposeMusicSequence(s5);
                    break;
                case 159:
                    DisposeMusicSequence(s6);
                    break;
                case 143:
                    DisposeMusicSequence(s7);
                    break;
                case 127:
                    DisposeMusicSequence(s8);
                    break;
                default:
                    DisposeMusicSequence(s1);
                    break;
            }
            
            DisposeMusicPlayer(p);
            
            midisuccess = false;
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:[@": " stringByAppendingString:(NSString *)[command.arguments objectAtIndex:0]]];
        }
        else
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:[@": " stringByAppendingString:(NSString *)[command.arguments objectAtIndex:0]]];
        
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }];
}

@end