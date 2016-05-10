#import "HWPHello.h"

@implementation HWPHello
{
    // Regular C implementation:
    char * messageToSend;
    struct sockaddr_in broadcastAddr;
    int DatagramSocketC;
    Boolean successInitializingTransmitter;
    Boolean successInitializingReceiver;
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
        
        NSString* socket = [NSString stringWithFormat:@"%i", DatagramSocketC];
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
        int listeningSocket = socket(PF_INET, SOCK_DGRAM, IPPROTO_UDP);
        if (listeningSocket <= 0) {
            err = [NSString stringWithFormat:@"Error: listenForPackets - socket() failed."];
            successInitializingReceiver = false;//return;
        }
        else
        {
            // set timeout to 2 seconds.
            struct timeval timeV;
            timeV.tv_sec = 1;
            timeV.tv_usec = 0;
            
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
                    void *buf = malloc(bufSize);
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
                        
                        NSString *address = [NSString stringWithCString:addrBuf encoding:NSASCIIStringEncoding];
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

@end