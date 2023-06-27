import cv2
import numpy as np
import face_recognition as fc
import requests
from types import SimpleNamespace
from flask import *  
import urllib
# imgelon=fc.load_image_file("elon1.jpeg")
# imgelon=cv2.cvtColor(imgelon,cv2.COLOR_BGR2RGB)
# elontest=fc.load_image_file("testelon.jpeg")
# elontest=cv2.cvtColor(elontest,cv2.COLOR_BGR2RGB)
# imgmodi=fc.load_image_file("modi.jpeg")
# imgmodi=cv2.cvtColor(imgmodi,cv2.COLOR_BGR2RGB)


# faceloc=fc.face_locations(imgelon)[0]
# elonEncode=fc.face_encodings(imgelon)[0]
# print(type(elonEncode))
# cv2.rectangle(imgelon,(faceloc[3],faceloc[0],faceloc[1],faceloc[2]),(0,0,0),3)

# faceloc1=fc.face_locations(imgmodi)[0]
# modiEncode=fc.face_encodings(imgmodi)[0]
# cv2.rectangle(imgmodi,(faceloc1[3],faceloc1[0],faceloc1[1],faceloc1[2]),(0,0,0),3)

# faceloc2=fc.face_locations(elontest)[0]
# testElonEncode=fc.face_encodings(elontest)[0]
# cv2.rectangle(elontest,(faceloc2[3],faceloc2[0],faceloc2[1],faceloc2[2]),(255,0,255),2)


# results=fc.compare_faces([elonEncode],testElonEncode)
# print(results)
# cv2.imshow("testelon",elontest)
# cv2.imshow('elon',imgelon)
# cv2.imshow('modi',imgmodi)





# cv2.waitKey(0)


# print(urllib.request.urlopen)


# return the encode ----------------------------------------------------------------------
def getEncode(img):
    req = urllib.request.urlopen(img)
    arr = np.asarray(bytearray(req.read()), dtype=np.uint8)
    imdata = cv2.imdecode(arr, -1) # 'Load it as it is'
    
    imdata=cv2.cvtColor(imdata,cv2.COLOR_BGR2RGB)
    encode=fc.face_encodings(imdata)
    
    return encode
    # if(len(encode)):
    #     return {'status':1,encode:encode[0]}
    # else:
    #     return {'status':11,encode:[],'msg':"face is not in the image"}
   
app = Flask(__name__)  


# for sendEncoding----------------------------------------------------------------
@app.route('/getencode',methods = ['POST'])  
def getencode():
    if(request.data):
        data = json.loads(request.data, object_hook=lambda d: SimpleNamespace(**d))
        encode=getEncode(data.img)
        if(len(encode)):
          return jsonify({'status':1,'encode':encode[0].tolist()})
        else:
            return jsonify({'status':11,'msg':"face is not detecting"})
    else:
        return jsonify({"status":11,'msg':"something wrong"})
   


# for takeattendance -------------------------------------------------------------
@app.route('/takeattendance',methods = ['POST'])  
def takeattendance():
    
    if(request.data):

        data = json.loads(request.data, object_hook=lambda d: SimpleNamespace(**d))
       
        
        encode=getEncode(data.img)
        if(len(encode)):
          for item in data.list:
              results=fc.compare_faces([item.encode],encode[0])
              if(results[0]):
                  return jsonify({'status':1,'enroll':item.enroll})
                  
          return jsonify({'status':11,'msg':"faced is not matched anyone"})
        else:
            return jsonify({'status':11,'msg':"face is not detecting"})
    else:
        return jsonify({"status":11,'msg':"something wrong"})
   

if __name__ =='__main__':  
    app.run(debug = True)  