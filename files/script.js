var s1 = document.getElementById('screen1');
var s2 = document.getElementById('screen2');

function Calc(e) {
  
  var operation = {
  "+": function (x, y) { return +(Number(x) + Number(y)).toFixed(10); },
  "-": function (x, y) { return +(x - y).toFixed(10); },
  "*": function (x, y) { return +(x * y).toFixed(10); },
  "/": function (x, y) { return +(x / y).toFixed(10); }
};
  
  var operStatus, oper = n2 = n1 = oio = '';     
  
  function clearTab() {
    n1 = s1.value = '';       
  };
  
  function delLastSym(str) {
    return str.slice(0, -1);
  }
  
  this.but = function(j) {  
    if(!operStatus) { clearTab(); }       
    if(n1 == '0') { // 0
      if(s2.value[s2.value.length-1] == '0') s2.value = s2.value.slice(0, s2.value.length-1);
      n1 = ''; 
    };
    if(oper == '-' && !n2 && !operStatus) n1 = '-';   // -     
    operStatus = true;
    s1.value = n1 += j.value;   
    s2.value += j.value
  };
  
  this.op = function(j) {
    if(operStatus && n2) {       
      s1.value = n2 = operation[oper](n2, n1);   
      operStatus = false;      
      n1 = '';
    } else if(operStatus) {
      n2 = n1;
      operStatus = false;
    }     
    oper = j.value;
    if(!s2.value) { s2.value = n2 = s1.value; }
    if(s2.value[s2.value.length - 1] in operation) { s2.value = delLastSym(s2.value) };
    s2.value += oper;
  };
  
  this.res = function() {    
    if(!s2.value) { s1.value = oio ? operation[oper](s1.value, oio) : s1.value; }
    else {
    s1.value = n2 ? operation[oper](n2, n1) : n1; 
    oio = n1;
    s2.value = n1 = n2 = '';
    }       
  };
  
  this.clr = function() {
    s2.value = s1.value = n2 = n1 = oper = oio = '';       
  };    
  
  this.ce = function() {    
    if(n1) {       
      s2.value = s2.value.slice(0, -n1.length);
      clearTab();
    }   
  };  
  
  this.del = function() {
    if(s1.value && operStatus) {
      s1.value = n1 = delLastSym(s1.value);
      s2.value = delLastSym(s2.value);      
    }    
  };
  
  this.dec = function() {   
    operStatus = true;
    if(!n1 || s2.value[s2.value.length-1] in operation) {
      clearTab();
      if(oper == '-' && !n2) n1 = '-'; // -
      s2.value += '0.';
      s1.value = n1 += '0.';
    }else if(!~n1.indexOf('.') && n1 && s2.value) {
      s2.value += '.';
      n1 = s1.value += '.';
    }
  }; 

  var self = this;

  e.onclick = function(el) {
    var t = el.target;
    var b = t.getAttribute('data-b');
    if( b ) {
      self[b](t);
      }
    }
};

new Calc(calc);
