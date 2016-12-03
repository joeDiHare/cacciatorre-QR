input='il parcheggio bottazzi non gira';
console.log(input);
if (input.length%2){
  input = input+'*';
}
console.log(input);

// encrypt
var k=0;
var s = [];
for (n=input.length-1; n>=0; n=n-2){
    s[k]=input[n];
    k = k+2;
    }
    k=k-1;
console.log(s.join(','))
for (n=input.length-2; n>=0; n=n-2){
    s[k]=input[n];
    k = k-2;
    }
var SET = "a bc de fghijklmnopqrstuvwxyz0123456789 ";
var init = [];
var fina = [];
for (n=0; n<8; n++){
  init[n] = SET[Math.ceil((SET.length-1)*Math.random())];
  fina[n] = SET[Math.ceil((SET.length-1)*Math.random())];
}
s = s.join('');
console.log(s);
for (n=0;n<15;n++){
  var pos = Math.ceil((s.length-2)*Math.random());
  s = s.substr(0, pos) + '§' + s.substr(pos);
}
console.log(s);
s = init.join('')+s+fina.join('');
console.log(s);

// decrypt
var s = s.slice(8,s.length-8).replace(/[§]/g,'');
console.log(s);
var k=s.length;
var s1 = [];
for (n=0; n<s.length; n=n+2){
    s1[k]=s[n];
    k = k-2;
    }
    k=k+1;
for (n=1; n<s.length; n=n+2){
    s1[k]=s[n];
    k = k+2;
    }

s1=s1.join('').replace(/[*]/g,'');
console.log(s1);
