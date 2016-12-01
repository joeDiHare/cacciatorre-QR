function adjustColumn(s){
  s = s.slice(8,s.length-8).replace(/[§]/g,'');
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
  return s1;
}
