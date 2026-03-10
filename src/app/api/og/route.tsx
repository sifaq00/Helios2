/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // Mengambil data dari URL parameter untuk kartu (Customizable)
    const title = searchParams.get('title') || 'MARKET ANOMALY DETECTED';
    const coin = searchParams.get('coin') || 'BTC';
    const score = searchParams.get('score') || '9.0';
    const signal = searchParams.get('signal') || 'BULLISH';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#000',
            fontFamily: 'monospace',
            padding: '40px',
            border: '10px solid #ff0000',
            position: 'relative',
          }}
        >
          {/* Background Dithering Pattern Effect */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: 0.1,
              backgroundImage: 'radial-gradient(#ff0000 2px, transparent 2px)',
              backgroundSize: '20px 20px',
            }}
          />

          {/* Header */}
          <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div style={{ color: '#ff0000', fontSize: '24px', fontWeight: 'bold' }}>MM_TERMINAL.v1</div>
            <div style={{ color: '#555', fontSize: '20px' }}>SECURE_UPLINK_ACTIVE</div>
          </div>

          {/* Main Card Frame */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              backgroundColor: '#050505',
              border: '4px solid #ff0000',
              padding: '30px',
              boxShadow: '15px 15px 0px #7a0000',
            }}
          >
            <div style={{ color: '#ff0000', fontSize: '18px', marginBottom: '10px' }}>// ALPHA_SIGNAL_REPORT</div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
                <div style={{ 
                    fontSize: '64px', 
                    fontWeight: 'black', 
                    color: '#fff', 
                    backgroundColor: '#ff0000', 
                    padding: '0 20px',
                    textTransform: 'uppercase'
                }}>
                    {coin}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ color: '#aaa', fontSize: '20px' }}>IMPACT_SCORE</div>
                    <div style={{ color: '#fff', fontSize: '42px', fontWeight: 'bold' }}>{score}/10</div>
                </div>
            </div>

            <div style={{ 
                fontSize: '32px', 
                color: '#fff', 
                fontWeight: 'bold', 
                borderBottom: '2px solid #333', 
                paddingBottom: '10px',
                marginBottom: '20px' 
            }}>
              {title}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ 
                    backgroundColor: signal === 'BULLISH' ? '#0a1a0a' : '#1a0000', 
                    border: `2px solid ${signal === 'BULLISH' ? '#00ff00' : '#ff0000'}`,
                    color: signal === 'BULLISH' ? '#00ff00' : '#ff0000',
                    padding: '5px 15px',
                    fontSize: '24px',
                    fontWeight: 'bold'
                }}>
                    {signal}
                </div>
                <div style={{ color: '#555', fontSize: '18px' }}>via ALPHA_RADAR</div>
            </div>
          </div>

          {/* Corner Accents */}
          <div style={{ position: 'absolute', top: '20px', left: '20px', width: '30px', height: '30px', borderTop: '4px solid #ff0000', borderLeft: '4px solid #ff0000' }} />
          <div style={{ position: 'absolute', top: '20px', right: '20px', width: '30px', height: '30px', borderTop: '4px solid #ff0000', borderRight: '4px solid #ff0000' }} />
        </div>
      ) as any,
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}