import { Component } from '@angular/core';
import { HttpClient, HttpHeaders, HttpBackend } from '@angular/common/http';
import { environment } from '../../environments/environment';




@Component({
  selector: 'app-file-uploader',
  standalone: true,
  imports: [],
  templateUrl: './file-uploader.component.html',
  styleUrl: './file-uploader.component.css'
  
})
export class FileUploaderComponent {
  selectedFile: File | null = null;
  uploadStatus: string = '';
  private rawHttp: HttpClient;
  private baseUrl = environment.serviceURL.baseURL + 'presignedUrlPut';
  constructor(private http: HttpClient,  private httpBackend: HttpBackend) {
    // Create a new HttpClient instance using the HttpBackend
    this.rawHttp = new HttpClient(httpBackend);
    
  }

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
    }
  }

  uploadFile(): void {
    if (!this.selectedFile) {
      alert('Please select a file.');
      return;
    }

    const filename = this.selectedFile.name;
    const headers = new HttpHeaders({
      'Content-Type': this.selectedFile.type || 'application/octet-stream',
    });

    // Step 1: Get the presigned URL from backend
    this.http.get<{ url: string }>( `${this.baseUrl}/${filename}`)
      .subscribe({
        next: (response) => {
          const presignedUrl = response?.url;
          console.log('Response received ---->', response);
          if (!presignedUrl) {
            console.error("Presigned URL is missing!");
            return;
          }
          
          console.log('Presigned URL received ---->', presignedUrl);
          // Step 2: Upload the file to S3
          this.rawHttp.put(presignedUrl, this.selectedFile, {
            headers: headers,
            reportProgress: true,
            responseType: 'text' as 'json',
            observe: 'response',
            // 👇 Tells Angular not to include credentials, cookies, or XSRF tokens
            withCredentials: false}).subscribe({
            next: () => this.uploadStatus = '✅ File uploaded successfully!',
            error: (err) => {
              console.error(err);
              this.uploadStatus = '❌ Upload failed.';
            }
          });
        },
        error: (err) => {
          console.error(err);
          this.uploadStatus = '❌ Failed to get presigned URL.';
        }
      });
  }
}
