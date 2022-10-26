function make2DArray(cols, rows){
  let arr= new Array(cols);
  for (let i=0; i<arr.length; i++){
    arr[i] = new Array(rows);
  }
  return arr;
}

let grid;
let cols;
let rows;
let resolution = 10

    
    function setup() {
        var myCanvas = createCanvas(windowWidth, windowHeight);
        myCanvas.parent("bg");
        cols = floor(width/resolution);
        rows = floor(height/ resolution);
        grid = make2DArray(cols,rows);
        for(let i = 0; i<cols; i++){
          for(let j = 0; j<rows; j++){
            grid[i][j]=floor(random(2));
          }
        }
      }

      function draw() {
      background(0);
     
      

      let next = make2DArray(cols,rows);
      // compute next based on grid 

      for(let i = 0; i<cols; i++){
            for(let j = 0; j<rows; j++){
              let state = grid[i][j];

              //Edges

             

              let sum = 0; 
              let neighbors = countNeighbors(grid,i,j);
                if (state == 0 && neighbors == 3){
                  next[i][j] = 1;
                } else if (state == 1 && (neighbors <2 || neighbors > 3)){
                  next[i][j] = 0;
                } else{
                  next[i][j] = state;
                }
            }
          }


      grid = next;

        for(let i = 0; i<cols; i++){
          for(let j = 0; j<rows; j++){
            let x = i * resolution;
            let y = j * resolution;
            if(grid[i][j]==1){
              fill(255);
              ellipse(x,y,resolution,resolution);
            }     
          }
        }
      }
   

    function countNeighbors(grid,x, y){
      let sum = 0;
      for (let i = -1; i<2; i++){
        for (let j=-1; j<2; j++){

          let col = (x + i + cols) % cols;
          let row = (y+ j + rows) % rows;
          sum += grid[col][row];
        }
      }
      sum -= grid[x][y];
      return sum;

    }
    let pos = 0;
    function mouseWheel(event) {
      
      if (pos > windowHeight){
        pos =0
      }
      if (pos <0){
        pos = windowHeight
      }
      else{
        print(event.delta);
        //move the square according to the vertical scroll amount
        pos += event.delta;
        for(let i = 0; i<cols; i++){
          for(let j = 0; j<rows; j++){
            // if(( mouseY > (rows * (j-1)) && mouseY < rows * j) && ( mouseX > (cols * (i-1)) && mouseX < cols * i)){
              if( pos > (resolution * (j-1)) && pos< resolution * j){
                if(grid[i][j]==0){
                  grid[i][j]=1
                }
                else{
                  grid[i][j]=0
                }
            }
          }
        }
      }
     


      //uncomment to block page scrolling
      //return false;
    }