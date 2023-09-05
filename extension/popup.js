// Copyright 2017 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// This event is fired with the user accepts the input in the omnibox.
// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//   if (request.action) {
//     console.log(request.message);
//   }
// });

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
 

  
  if (request.action === "showModel") {
    // Thực hiện hành động hiển thị model trong trang web
    // Ví dụ: thêm một phần tử <div> chứa model vào trang web
    sendResponse("vao day");
    chrome.runtime.sendMessage({
      action: "showModel1",
      message: "Button clicked",
    },(response)=>{console.log(response)});
  }
  
});
