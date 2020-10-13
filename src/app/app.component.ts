import { Component,ElementRef,ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 	
 	@ViewChild('canvas')
  	canvas: ElementRef<HTMLCanvasElement>;
  	public context: CanvasRenderingContext2D;

  	selectedFile: any
  	iterations:number = 2000000;
  	areaIn:number = 0;
  	areaTotal:number = 0;
	loadingImage:boolean = false;

	ngAfterViewInit(): void {
    	this.context = this.canvas.nativeElement.getContext('2d');
  	}

  	updateIter(value: any){
		this.iterations = value;
	}

  	onFileChanged(fileInput: any){
		const file: File = fileInput.files[0];
	    const reader = new FileReader();

	    reader.addEventListener('load', (event: any) => {
		    this.selectedFile = reader.result;
		   	this.imageFileToCanvas();
		   	this.loadingImage = true;
	    });

	    reader.readAsDataURL(file);
	}

	imageFileToCanvas(){

		var img = new Image();

		var ctx = this.context
		var canvas = this.canvas.nativeElement

		img.src = this.selectedFile;

		img.addEventListener('load', () => {
			canvas.width = img.width;
			canvas.height = img.height;
			ctx.drawImage(img, 0, 0, img.width, img.height);
			this.calculateArea();
		});

	}

	calculateArea(){
  		
  		let w = this.canvas.nativeElement.width;
  		let h = this.canvas.nativeElement.height;
  		let imageData = this.context.getImageData(0, 0, w, h).data

  		this.areaTotal = w*h;
		
		let n_inside = 0;
		for (var i = 0; i < this.iterations; ++i) {
			
			let x = Math.floor((Math.random() * w));
  			let y = Math.floor((Math.random() * h));

  			const idx = y * (w * 4) + x * 4;
  			
  			let isBlack = (imageData[idx] + imageData[idx+1] + imageData[idx+2])/3 < 20  			
  			if (isBlack){
  				n_inside = n_inside + 1;
  			}

		}

		this.areaIn = (n_inside/this.iterations) * this.areaTotal

  	}

  	title = 'montecarlo';

}