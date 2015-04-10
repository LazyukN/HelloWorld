// var infoMatrix=
// {
// 	addRowLength:

// }
function choiceMatrix()
{
	var arguments=[];
	var radioA=document.getElementById("choiceMatrixA");
	var radioB=document.getElementById("choiceMatrixB");
	if(radioA.checked)
	{
		arguments[0]="rowInMatrixA";
		arguments[1]="matrixA";
		arguments[2]="a";
		console.log("A");
	}
	if(radioB.checked)
	{
		arguments[0]="rowInMatrixB";
		arguments[1]="matrixB";
		arguments[2]="b";
		console.log("B");
	}
	return arguments;
};
console.log(choiceMatrix());

// document.getElementById("buttonMultiply").onclick=
function matricesMultiply(Amatrix,Bmatrix)
{	
	var rowA=Amatrix.length;
	var colA=Amatrix[0].length;
	var rowB=Bmatrix.length;
	var colB=Bmatrix[0].length;
	var matrixC=[];
	var t=0;
	if(colA === rowB)
	{	
		for(var i=0;i<rowA;i++)
		{
			matrixC[i]=[];
			for(var j=0;j<colB;j++)
			{	
				t=0;
				for(var k=0;k<colA;k++)
				{
					t += Amatrix[i][k]*Bmatrix[k][j];
				}
				matrixC[i][j]=t;
			}
		}			
	}
	else change("#f6c1c0","block");
	for(var i=0;i<rowA;i++)
	{	
		console.log(matrixC[i]);
	}
	outputMatrix(matrixC);
	change("#bcbcbc","none");
	return matrixC;
};


function addRow(rowMatrix,matrix,indexNameCel)
{	
	

	var RowMatrix=document.getElementsByClassName(rowMatrix);
	console.log(rowMatrix)
	RowMatrixLength=RowMatrix.length;
	RowMatrixLength+=1;
	if(RowMatrix.length<10)
	{
		var countCol=RowMatrix[0].getElementsByTagName("input").length;
		var matrix=document.getElementById(matrix);
		var newRow=document.createElement("div");
		newRow.className=rowMatrix;
		matrix.appendChild(newRow);
		var newCel=[];
		for(var i=0;i<countCol;i++)
		{	
			var indexCol=i;
			indexCol++;
			newCel[i]=document.createElement("input");
			newCel[i].setAttribute("type","text");
			newCel[i].setAttribute("placeholder",indexNameCel+RowMatrixLength+','+indexCol);
			if(rowMatrix==="rowInMatrixResult")
			{
				newCel[i].setAttribute("disabled","disabled");
			}
			newCel[i].addEventListener('keyup',testInput,false)
			newRow.appendChild(newCel[i]);

		}
		if(rowMatrix==="rowInMatrixA") addRow("rowInMatrixResult","matrixResult","c");
			
		
		

	}		
}








function addCol(colMatrix,indexNameCel)
{
	
	var ColMatrix=document.getElementsByClassName(colMatrix);
	var colMatrixlength=ColMatrix[0].getElementsByTagName("input").length;
	var ColMatrixLength=ColMatrix.length;
	var indexCol=colMatrixlength;
	indexCol+=1;
	if(colMatrixlength<10)
	{
		for(var i=0;i<ColMatrixLength;i++)
		{		

			var indexRow=i;
			indexRow++;
			var newCol=document.createElement("input");
			newCol.setAttribute("type","text");
			newCol.setAttribute("placeholder",indexNameCel+indexRow+","+indexCol);
			if(colMatrix === "rowInMatrixResult")
			{
				newCol.setAttribute("disabled","disabled");
			}
			newCol.addEventListener('keyup',testInput,false);
			ColMatrix[i].appendChild(newCol);
		}
	
		if(colMatrix ==="rowInMatrixB") addCol("rowInMatrixResult","c");
	}
}







function delRow(rowMatrix)
{
	var RowMatrix=document.getElementsByClassName(rowMatrix);
	if(RowMatrix.length>2)
	{
		RowMatrix[RowMatrix.length-1].parentNode.removeChild(RowMatrix[RowMatrix.length-1]);
		if(rowMatrix==="rowInMatrixA") delRow("rowInMatrixResult");
	}
}



function delCol(rowMatrix)
{
	var RowsMatrix=document.getElementsByClassName(rowMatrix);
	var RowsMatrixlength=RowsMatrix.length;
	var ColsMatrix=RowsMatrix[0].getElementsByTagName("input").length;
	if(ColsMatrix>2)
	{
		for(var i=0;i<RowsMatrixlength;i++)
		{
			var CelMatrix=RowsMatrix[i].getElementsByTagName("input");
			CelMatrix[CelMatrix.length-1].parentNode.removeChild(CelMatrix[CelMatrix.length-1]);		
		}
	
		if(rowMatrix==="rowInMatrixB") delCol("rowInMatrixResult");
	}
}



function pushInMassiv(rowMatrix)
{
	var RowsMatrix=document.getElementsByClassName(rowMatrix);
	var RowsMatrixlength=RowsMatrix.length;
	var CellsMatrix=[];
	var matrix=[];
	for(var i=0;i<RowsMatrixlength;i++)
	{
		 CellsMatrix[i]=RowsMatrix[i].getElementsByTagName("input");
		 matrix[i]=[];
		 	for(var j=0;j<CellsMatrix[i].length;j++)
		 	{
		 		matrix[i][j]=CellsMatrix[i][j].value;
		 	}	
	}
	return matrix;
	
}


function outputMatrix(resultMatrix)
{
	var rowsMatrixResult=document.getElementsByClassName("rowInMatrixResult");
	var colsMatrixResult=[];
	for(var i=0;i<rowsMatrixResult.length;i++)
	{
		colsMatrixResult[i]=rowsMatrixResult[i].getElementsByTagName("input");
			for(var j=0;j<colsMatrixResult[i].length;j++)
			{
				colsMatrixResult[i][j].value=resultMatrix[i][j];
			}
	}

}

function clearMatrices()
{
	var CellsMatrix=document.querySelectorAll('input[type^="text"]');
	for(var i=0;i<CellsMatrix.length;i++)
	{
		CellsMatrix[i].value="";
	}	
	change("#bcbcbc","none");


}


function changeMatrixPlaces() 
{
	var matrixA=document.getElementById("matrixA");
	var childrenMatrixA=matrixA.children;
	var childrenMatrixALength=childrenMatrixA.length;
	var matrixB=document.getElementById("matrixB")
	var childrenMatrixB=matrixB.children;
	childrenMatrixBLength=childrenMatrixB.length;
	for(var i=0;i<childrenMatrixALength;i++)
	{
		// childrenMatrixA[0].className='rowInMatrixB';

		matrixB.appendChild(childrenMatrixA[0]);
		
	}
	for(var i=0;i<childrenMatrixBLength;i++)
	{
		// childrenMatrixB[0].className='rowInMatrixA';
		matrixA.appendChild(childrenMatrixB[0]);
		
	}
	matrixA.id="matrixB";
	matrixB.id="matrixA";
	// если чё переделай функцию добавление строк и столбцов , так что она добавляет в матрицы по айдишникам фиделсета
	var nameMatrixA=document.getElementsByClassName("nameMatrixA");
	var nameMatrixB=document.getElementsByClassName("nameMatrixB");
	nameMatrixA[0].className="nameMatrixB";
	nameMatrixB[0].className="nameMatrixA";


}


//бага поменять классы дивов местами тоже
window.onload=function test()
{
	var input=document.querySelectorAll("input[type='text']");
	console.log(input.length);
	for(var i=0;i<input.length;i++)
	{
		input[i].addEventListener('keyup',testInput,false)
	
	}	
}



function testInput()
{
	
	change("#5199db","none");
	var input=document.querySelectorAll("input[type='text']");
	var values=[];
	for(var i=0;i<input.length;i++)
	{
		values[i]=input[i].value;

	}
	var rep=/[^\d]|.../;
	for(var i=0;i<input.length;i++)
		if(rep.test(values[i]))
		{
			
			values[i]=values[i].replace(rep,"");
			input[i].value=values[i];
			
		}
	for(var i=0;i<input.length;i++)
	{
		if(values[i]>10)
		{
			values[i]=values[i].slice(0,-1);
			input[i].value=values[i];
		}
	}

}



function change(color,display)
{
	var changeInterface=document.getElementById("interface");
	changeInterface.style.background=color;
	var changeButton=document.getElementById("buttonMultiply");
	changeButton.style.backgroundColor=color;
	var errorMessage=document.getElementById("error");
	errorMessage.style.display=display;

}