'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useImageContext } from '@/lib/image-context';

export default function PreviewPage() {
  const [activeTab, setActiveTab] = useState('before');
  const [isMobile, setIsMobile] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [showImagePopup, setShowImagePopup] = useState(false);
  const { uploadedImage } = useImageContext();

  useEffect(() => {
    // 画面遷移時に最上部にスクロールする
    window.scrollTo(0, 0);

    // Check if the device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
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
        <div className="grid md:grid-cols-12 gap-6">
          <div className="md:col-span-8 md:col-start-3">
            {/* ステップナビゲーション */}
            <div className="step-nav">
              <div className="step-item">
                <div className="step-circle step-completed">1</div>
                <div className="step-label">
                  部屋写真
                  <br />
                  アップ
                </div>
              </div>
              <div className="step-line line-active"></div>
              <div className="step-item">
                <div className="step-circle step-completed">2</div>
                <div className="step-label">
                  カテゴリ
                  <br />
                  範囲選択
                </div>
              </div>
              <div className="step-line line-active"></div>
              <div className="step-item">
                <div className="step-circle step-completed">3</div>
                <div className="step-label">素材選択</div>
              </div>
              <div className="step-line line-active"></div>
              <div className="step-item">
                <div className="step-circle step-active">4</div>
                <div className="step-label">作成完了</div>
              </div>
            </div>

            <div className="text-center mb-4 mt-6">
              <h1 className="text-2xl md:text-3xl font-bold">作成完了！</h1>
              <p className="text-sm md:text-base text-gray-600 mt-2">タブで Before/After を切り替え</p>
            </div>

            <div className="bg-white rounded-lg p-6 mb-8 relative">
              {/* タブ切り替えボタン */}
              <div className="flex mb-4">
                <button
                  className={`tab-button ${activeTab === 'before' ? 'tab-active' : 'tab-inactive'}`}
                  onClick={() => handleTabChange('before')}
                >
                  Before
                </button>
                <button
                  className={`tab-button ${activeTab === 'after' ? 'tab-active' : 'tab-inactive'}`}
                  onClick={() => handleTabChange('after')}
                >
                  After
                </button>
              </div>

              <div
                className="relative w-full mb-6 cursor-pointer"
                onTouchStart={handleTouchStart}
                onClick={handleImageClick}
              >
                {activeTab === 'before' ? (
                  uploadedImage ? (
                    <Image
                      src={uploadedImage}
                      alt="Before Image"
                      width={640}
                      height={480}
                      className="w-full h-auto object-contain rounded-lg"
                    />
                  ) : (
                    <div className="w-full h-[400px] bg-gray-200 flex items-center justify-center rounded-lg">
                      <span className="text-gray-500">アップロードされた写真</span>
                    </div>
                  )
                ) : (
                  <div className="w-full h-[400px] bg-gray-200 flex items-center justify-center rounded-lg">
                    <span className="text-gray-500">生成された写真</span>
                  </div>
                )}
              </div>

              <div className="flex justify-center gap-4 mb-8">
                <button
                  className="bg-[#eb6832] hover:bg-[#d55a25] text-white flex-1 flex items-center justify-center gap-2 py-3 rounded-md transition-colors"
                  onClick={handleSave}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  <span>保存する</span>
                </button>
                <button
                  className="bg-[#eb6832] hover:bg-[#d55a25] text-white flex-1 flex items-center justify-center gap-2 py-3 rounded-md transition-colors"
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
              </div>

              {showShareOptions && (
                <div className="flex justify-center gap-6 mb-8">
                  <a href="https://www.instagram.com" target="_blank" className="w-16 h-16 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-50">
                    <Image src="/images/instagram-icon.png" alt="Instagram" width={32} height={32} />
                  </a>
                  <a href="https://www.twitter.com" target="_blank" className="w-16 h-16 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-50">
                    <Image src="/images/x-icon.jpeg" alt="X" width={32} height={32} />
                  </a>
                  <a href="https://www.facebook.com" target="_blank" className="w-16 h-16 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-50">
                    <Image src="/images/facebook-icon.png" alt="Facebook" width={32} height={32} />
                  </a>
                  <a href="https://www.pinterest.com" target="_blank" className="w-16 h-16 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-50">
                    <Image src="/images/pinterest-icon.png" alt="Pinterest" width={32} height={32} />
                  </a>
                </div>
              )}

              <div className="bg-[#fff9e0] p-4 rounded-lg mb-6">
                <p className="text-sm md:text-base text-center text-gray-700">
                  国土交通大臣登録団体の事業者を<br />
                  最大4社までご紹介します
                </p>
              </div>

              <a
                href="#"
                className="relative block w-full mb-6 border border-[#eb6832] text-[#eb6832] py-3 px-4 rounded-md text-center bg-white font-medium"
              >
                <span className="absolute left-2 top-1/2 -translate-y-1/2 bg-red-500 text-white px-2 py-1 text-xs rounded-md font-bold">無料</span>
                <span className="ml-6">優良リフォーム会社のご紹介はこちら</span>
              </a>
            </div>

            {/* モバイル用のナビゲーションボタン */}
            {isMobile ? (
              <div className="flex flex-col gap-3 mb-8">
                <Link href="/3-materials">
                  <div className="bg-gray-500 text-white py-2 px-6 rounded-md font-medium hover:bg-gray-600 transition-colors text-center">
                    <span className="text-sm">←戻る</span>
                  </div>
                </Link>
                <Link href="/1-upload">
                  <div className="bg-blue-500 text-white py-2 px-6 rounded-md font-medium hover:bg-blue-600 transition-colors text-center">
                    <span className="text-sm">他の部屋でも試す</span>
                  </div>
                </Link>
                <Link href="/">
                  <div className="bg-[#eb6832] text-white py-2 px-6 rounded-md font-medium hover:bg-[#d55a25] transition-colors text-center">
                    <span className="text-sm">トップページへ</span>
                  </div>
                </Link>
              </div>
            ) : (
              <div className="flex flex-wrap justify-between gap-2 mt-auto">
                <Link href="/3-materials">
                  <div className="bg-gray-500 text-white py-2 px-6 rounded-md font-medium hover:bg-gray-600 transition-colors">
                    <span className="text-sm">←戻る</span>
                  </div>
                </Link>
                <Link href="/1-upload">
                  <div className="bg-blue-500 text-white py-2 px-6 rounded-md font-medium hover:bg-blue-600 transition-colors">
                    <span className="text-sm">他の部屋でも試す</span>
                  </div>
                </Link>
                <Link href="/">
                  <div className="bg-[#eb6832] text-white py-2 px-6 rounded-md font-medium hover:bg-[#d55a25] transition-colors">
                    <span className="text-sm">トップページへ</span>
                  </div>
                </Link>
              </div>
            )}
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
              uploadedImage ? (
                <Image
                  src={uploadedImage}
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
              <div className="w-full h-[600px] bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">生成された写真</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}