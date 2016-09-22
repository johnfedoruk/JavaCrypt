app.factory(
  "CryptoService",
  [
    function() {
      var key = null;
      return {
        setKey:function(k) {
          if(key==null&&k.length>0)
            key = k;
        },
        encrypt:function(plaintext) {
          if(key==null)
            return plaintext;
          else
            return Aes.Ctr.encrypt(plaintext,key,256);
        },
        decrypt:function(ciphertext) {
          if(key==null)
            return ciphertext;
          else
            return Aes.Ctr.decrypt(ciphertext,key,256);
        }
      };
    }
  ]
);
