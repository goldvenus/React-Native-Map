/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"
#import <Firebase.h>
@import GooglePlaces;
@import GoogleMaps;
#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <UserNotifications/UserNotifications.h>

#import <React/RCTPushNotificationManager.h>
#import "RNFirebaseNotifications.h"
#import "RNFirebaseMessaging.h"

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [FIRApp configure];
  [RNFirebaseNotifications configure];


     // Get the path for Google-Service-Info.plist
      NSString * filePath =[[NSBundle mainBundle] pathForResource:@"GoogleService-Info" ofType: @"plist"];


  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"JumpSeat"
                                            initialProperties:nil];

  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  [GMSPlacesClient provideAPIKey:@"AIzaSyAgvPYFy5bVZbyNotluxup_mo_Wd_4T_-4"];
  [GMSServices provideAPIKey:@"AIzaSyAgvPYFy5bVZbyNotluxup_mo_Wd_4T_-4"];
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  [[UNUserNotificationCenter currentNotificationCenter] setDelegate:self];
  [self registerForRemoteNotifications];
  UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];

  

  
  return YES;
}

// Called when a notification is delivered to a foreground app.
-(void)userNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(UNNotificationPresentationOptions options))completionHandler{
    completionHandler(UNAuthorizationOptionSound | UNAuthorizationOptionAlert | UNAuthorizationOptionBadge);
}

// Called when a user taps on a notification in the foreground
- (void)userNotificationCenter:(UNUserNotificationCenter *)center didReceiveNotificationResponse:(UNNotificationResponse *)response withCompletionHandler:(void (^)(void))completionHandler
{
    NSMutableDictionary *userData = [NSMutableDictionary dictionaryWithDictionary:response.notification.request.content.userInfo];
    [userData setObject:@(1) forKey:@"openedInForeground"];
    [RCTPushNotificationManager didReceiveRemoteNotification:userData];
    completionHandler();
}



- (void)registerForRemoteNotifications {
UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
center.delegate = self;
[center requestAuthorizationWithOptions:(UNAuthorizationOptionSound | UNAuthorizationOptionAlert | UNAuthorizationOptionBadge) completionHandler:^(BOOL granted, NSError * _Nullable error){
if(!error){
  dispatch_queue_t getPeopleQueue = dispatch_queue_create("Pinta Ocupantes", NULL);
   dispatch_async(getPeopleQueue, ^{
      [[UIApplication sharedApplication] registerForRemoteNotifications];
   });

}
}];

}

- (void)application:(UIApplication *)application didReceiveLocalNotification:(UILocalNotification *)notification {
  [[RNFirebaseNotifications instance] didReceiveLocalNotification:notification];
}

//  [RNFirebaseMessaging willPresentNotification:notification withCompletionHandler:completionHandler];
//  [[RNFirebaseMessaging instance] ]

// - (void)application:(UIApplication *)application didReceiveRemoteNotification:(nonnull NSDictionary *)userInfo {
//   [[RNFirebaseMessaging instance] didReceiveRemoteNotification:userInfo];
// }






- (void)application:(UIApplication *)application didReceiveRemoteNotification:(nonnull NSDictionary *)userInfo
fetchCompletionHandler:(nonnull void (^)(UIBackgroundFetchResult))completionHandler{
  [[RNFirebaseMessaging instance] didReceiveRemoteNotification:userInfo]; fetchCompletionHandler:completionHandler;
}








- (void)application:(UIApplication *)application didRegisterUserNotificationSettings:(UIUserNotificationSettings *)notificationSettings {
  [[RNFirebaseMessaging instance] didRegisterUserNotificationSettings:notificationSettings];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}


@end
