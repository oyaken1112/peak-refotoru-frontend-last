'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useImageContext } from '@/lib/image-context';

export default function PreviewPage() {
  const [activeTab, setActiveTab] = useState('before');
  const [isMobile, setIsMobile] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [showImagePopup, setShowImagePopup] = useState(false);
  const { uploadedImage, materialImage, categoryImage } = useImageContext();
  const shareOptionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 画面遷移時に最上部にスクロールする
    window.scrollTo(0, 0);

    // Check if the device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // シェアオプション外のクリックを検知
    const handleClickOutside = (event: MouseEvent) => {
      if (shareOptionsRef.current && !shareOptionsRef.current.contains(event.target as Node)) {
        setShowShareOptions(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('resize', checkMobile);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    // Store the initial touch position
    const touchStartX = e.touches[0].clientX;

    // Add a touch move event listener
    const handleTouchMove = (e: TouchEvent) => {
      const touchEndX = e.touches[0].clientX;
      const diff = touchEndX - touchStartX;

      // If swiped left to right, show before image
      if (diff > 50 && activeTab === 'after') {
        setActiveTab('before');
      }
      // If swiped right to left, show after image
      else if (diff < -50 && activeTab === 'before') {
        setActiveTab('after');
      }
    };

    // Add a touch end event listener to clean up
    const handleTouchEnd = () => {
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };

    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);
  };

  const handleSave = () => {
    // In a real app, this would trigger a download
    // For now, we'll just simulate it with an alert
    alert('画像を保存しています...');
  };

  const handleShare = () => {
    setShowShareOptions(!showShareOptions);
  };

  const handleImageClick = () => {
    setShowImagePopup(true);
  };

  return (
    <div className="min-h-screen bg-[#fdf6f2]">
      <header className="p-4 flex justify-between items-center bg-white shadow-sm">
        <Link href="/" className="flex items-center">
          <Image 
            src="/images/logo.png" 
            alt="リフォトル" 
            width={40} 
            height={40} 
            className="mr-2"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          <span className="text-xl font-bold">リフォトル</span>
        </Link>
        <button className="p-2 rounded-full hover:bg-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-4">
            <h1 className="text-2xl md:text-3xl font-bold">作成完了！</h1>
            <p className="text-sm md:text-base text-gray-600 mt-2">リフォーム後のイメージが完成しました</p>
          </div>

          {/* Before/Afterタブ表示（白字に変更） */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
            <div className="flex">
              <div className="w-1/2">
                <button
                  className={`w-full py-3 text-white text-center font-bold transition-colors ${activeTab === 'before' ? 'bg-[#eb6832]' : 'bg-gray-400'}`}
                  onClick={() => handleTabChange('before')}
                >
                  Before
                </button>
              </div>
              <div className="w-1/2">
                <button
                  className={`w-full py-3 text-white text-center font-bold transition-colors ${activeTab === 'after' ? 'bg-[#eb6832]' : 'bg-gray-400'}`}
                  onClick={() => handleTabChange('after')}
                >
                  After
                </button>
              </div>
            </div>

            {/* 画像表示エリア */}
            <div 
              className="relative px-4 py-4"
              onTouchStart={handleTouchStart}
              onClick={handleImageClick}
            >
              {activeTab === 'before' ? (
                // Before画像 - 初期表示
                uploadedImage || categoryImage ? (
                  <Image
                    src={uploadedImage || categoryImage || ''}
                    alt="Before Image"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-full h-auto object-contain rounded-lg"
                    style={{ 
                      maxHeight: isMobile ? '40vh' : '50vh'
                    }}
                  />
                ) : (
                  <div className="w-full h-[300px] bg-gray-200 flex items-center justify-center rounded-lg">
                    <span className="text-gray-500">アップロードされた写真</span>
                  </div>
                )
              ) : (
                // After画像 - リフォーム後
                materialImage || uploadedImage || categoryImage ? (
                  <Image
                    src={materialImage || uploadedImage || categoryImage || ''}
                    alt="After Image"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-full h-auto object-contain rounded-lg"
                    style={{ 
                      maxHeight: isMobile ? '40vh' : '50vh',
                      filter: 'contrast(1.05) brightness(1.03)' // 微妙な加工
                    }}
                  />
                ) : (
                  <div className="w-full h-[300px] bg-gray-200 flex items-center justify-center rounded-lg">
                    <span className="text-gray-500">生成された写真</span>
                  </div>
                )
              )}
            </div>
          </div>

          {/* 操作ボタン */}
          <div className="flex gap-4 mb-6">
            <button
              className="w-1/2 bg-[#eb6832] text-white py-3 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
              onClick={handleSave}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              <span>保存する</span>
            </button>
            <div className="relative w-1/2" ref={shareOptionsRef}>
              <button
                className="w-full bg-[#eb6832] text-white py-3 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
                onClick={handleShare}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="18" cy="5" r="3"></circle>
                  <circle cx="6" cy="12" r="3"></circle>
                  <circle cx="18" cy="19" r="3"></circle>
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                </svg>
                <span>共有する</span>
              </button>
              
              {/* シェアオプション - 実際のSNSアイコンを表示 */}
              {showShareOptions && (
                <div className="absolute left-0 right-0 top-full mt-2 bg-white shadow-lg rounded-lg p-4 z-10 flex justify-around">
                  <div className="text-center">
                    <Image src="/images/instagram.png" alt="Instagram" width={32} height={32} />
                    <div className="text-xs mt-1">Instagram</div>
                  </div>
                  <div className="text-center">
                    <Image src="/images/x.png" alt="X" width={32} height={32} />
                    <div className="text-xs mt-1">X</div>
                  </div>
                  <div className="text-center">
                    <Image src="/images/facebook.png" alt="Facebook" width={32} height={32} />
                    <div className="text-xs mt-1">Facebook</div>
                  </div>
                  <div className="text-center">
                    <Image src="/images/pinterest.png" alt="Pinterest" width={32} height={32} />
                    <div className="text-xs mt-1">Pinterest</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* リフォーム会社紹介バナー - キャンペーンバナー修正 */}
          <div className="mb-6">
            <Link href="/contact" className="block">
              <div className="border border-[#eb6832] rounded-lg p-4 text-center relative overflow-hidden">
                <div className="campaign-ribbon">
                  <span>キャンペーン中</span>
                </div>
                <div className="pt-4 mt-2">
                  <p className="text-base font-medium text-gray-800">優良リフォーム会社のご紹介はこちら</p>
                </div>
              </div>
            </Link>
            <div className="text-xs text-gray-500 text-center mt-2">※費用や期間などお気軽にお問い合わせください</div>
          </div>

          {/* 統一されたナビゲーションボタン - サイズ調整 */}
          <div className="flex flex-col gap-4 mb-8">
            <Link href="/3-materials" className="w-full">
              <div className="border border-[#eb6832] text-[#eb6832] bg-white py-4 rounded-lg font-medium text-center flex items-center justify-center h-14">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                <span>戻る</span>
              </div>
            </Link>
            <Link href="/1-upload" className="w-full">
              <div className="border border-[#2563eb] text-[#2563eb] bg-white py-4 rounded-lg font-medium text-center h-14">
                他の部屋でも試す
              </div>
            </Link>
            <Link href="/" className="w-full">
              <div className="border border-[#eb6832] text-white bg-[#eb6832] py-4 rounded-lg font-medium text-center h-14">
                トップページへ
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* 画像ポップアップ */}
      {showImagePopup && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setShowImagePopup(false)}
        >
          <div 
            className="relative max-w-4xl max-h-[90vh] bg-white p-4 rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
              onClick={() => setShowImagePopup(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            {activeTab === 'before' ? (
              uploadedImage || categoryImage ? (
                <Image
                  src={uploadedImage || categoryImage || ''}
                  alt="Before Image"
                  width={1200}
                  height={900}
                  className="max-w-full max-h-full object-contain"
                />
              ) : (
                <div className="w-full h-[600px] bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">アップロードされた写真</span>
                </div>
              )
            ) : (
              materialImage || uploadedImage || categoryImage ? (
                <Image
                  src={materialImage || uploadedImage || categoryImage || ''}
                  alt="After Image"
                  width={1200}
                  height={900}
                  className="max-w-full max-h-full object-contain"
                  style={{ 
                    filter: 'contrast(1.05) brightness(1.03)' // 微妙な加工
                  }}
                />
              ) : (
                <div className="w-full h-[600px] bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">生成された写真</span>
                </div>
              )
            )}
          </div>
        </div>
      )}

      {/* スタイル定義 */}
      <style jsx>{`
        /* キャンペーンリボン */
        .campaign-ribbon {
          position: absolute;
          top: 0;
          left: 0;
          background-color: #eb6832;
          color: white;
          font-weight: bold;
          font-size: 12px;
          text-align: center;
          width: 120px;
          transform: rotate(-45deg) translateX(-40px) translateY(-10px);
          padding: 5px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
      `}</style>
    </div>
  );
}