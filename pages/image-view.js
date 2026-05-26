import Head from 'next/head';

export default function ImageView() {
  return (
    <>
      <Head>
        <title>Instagram Image Viewer</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="View Instagram images in high quality" />
      </Head>
      
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '100vh', 
        backgroundColor: '#fafafa',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
      }}>
        <h1 style={{ marginBottom: '20px' }}>Instagram Image Viewer</h1>
        <p style={{ marginBottom: '30px', maxWidth: '600px', textAlign: 'center' }}>
          View Instagram images in high quality with our enhanced viewer. 
          Simply click the image below to view it in full resolution.
        </p>
        
        <div style={{ position: 'relative' }}>
          <img 
            src="/malicious-instagram.svg" 
            alt="Instagram content"
            style={{ 
              maxWidth: '100%', 
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              cursor: 'pointer'
            }}
            onClick={() => {
              // Optional: Add click handler for additional functionality
              console.log('Image clicked');
            }}
          />
        </div>
        
        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          <button 
            style={{
              padding: '10px 20px',
              backgroundColor: '#0095f6',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontWeight: 'bold',
              cursor: 'pointer',
              marginRight: '10px'
            }}
            onClick={() => window.location.href = 'https://instagram.com'}
          >
            Open Instagram
          </button>
          
          <button 
            style={{
              padding: '10px 20px',
              backgroundColor: '#efefef',
              color: 'black',
              border: 'none',
              borderRadius: '4px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
            onClick={() => window.history.back()}
          >
            Go Back
          </button>
        </div>
        
        <p style={{ marginTop: '20px', fontSize: '12px', color: '#999' }}>
          By using this viewer, you agree to our terms of service.
        </p>
      </div>
    </>
  );
}