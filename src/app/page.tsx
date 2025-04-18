'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Home() {
  const [imageError, setImageError] = useState({
    logo: false,
    leftIllustration: false,
    rightIllustration: false,
    beforeRoom: false,
    afterRoom: false,
    securityBadge: false,
    logoWhite: false
  });

  const [styleImagesError, setStyleImagesError] = useState<boolean[]>([
    false, false, false, false
  ]);

  const handleImageError = (imageName: string) => {
    setImageError(prev => ({
      ...prev,
      [imageName]: true
    }));
  };

  const handleStyleImageError = (index: number) => {
    setStyleImagesError(prev => {
      const newArray = [...prev];
      newArray[index] = true;
      return newArray;
    });
  };

  const styles = [
    { name: 'ナチュラル', src: '/images/style-natural.jpg' },
    { name: '#北欧モダン', src: '/images/style-nordic.jpg' },
    { name: '#リビング・ダイニング', src: '/images/style-living.jpg' },
    { name: '#キッチン', src: '/images/style-kitchen.jpg' }
  ];

  return (
    <div className="min-h-screen bg-[#fdf6f2]">
      {/* ヘッダー */}
      <header className="p-4 flex justify-between items-center bg-white shadow-sm">
        <div className="flex items-center">
          {!imageError.logo ? (
            <Image 
              src="/images/logo.png" 
              alt="リフォトル" 
              width={40} 
              height={40} 
              className="mr-2"
              onError={() => handleImageError('logo')}
            />
          ) : (
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-2">
              <span className="text-gray-400 text-xs">ロゴ</span>
            </div>
          )}
          <span className="text-xl font-bold">リフォトル</span>
        </div>
        <button className="p-2 rounded-full hover:bg-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </header>

      {/* メインコンテンツ */}
      <main className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          {/* タイトルセクション */}
          <div className="text-center mb-4">
            <h1 className="text-3xl font-bold mb-4">本当に <span className="text-[#eb6832]">安心</span>できる</h1>
            <div className="inline-flex items-center py-1 px-4 bg-gray-200 rounded-md mb-4">
              <span className="text-sm">リフォーム会社選び</span>
              <span className="text-sm ml-1">なら</span>
            </div>
            <p className="text-gray-700 mb-5">国土交通省登録団体に所属の<br />
            信頼できる会社のみを集めた</p>
            
            {/* バナーのサイズを縮小 */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex max-w-xs">
                <a href="#" className="px-3 py-2 text-xs bg-blue-600 text-white rounded-l-md font-medium">
                  TOPPANが運営する
                </a>
                <a href="#" className="px-3 py-2 text-xs bg-[#eb6832] text-white font-bold rounded-r-md">
                  リフォーム会社紹介サイト
                </a>
              </div>
            </div>
          </div>

          {/* イラストとテキストのセクション - レスポンシブ対応 */}
          <div className="flex py-4 mb-4">
            {/* 左側のイラスト - PCでは大きく、スマホでは小さく */}
            <div className="w-1/5 pr-2 flex justify-center">
              {!imageError.leftIllustration ? (
                <Image 
                  src="/images/illustration-left.png" 
                  alt="相談する人" 
                  width={90}
                  height={90}
                  className="object-contain w-auto h-auto md:w-[120px] md:h-[120px]"
                  onError={() => handleImageError('leftIllustration')}
                />
              ) : (
                <div className="w-20 h-20 md:w-28 md:h-28 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-400 text-xs">イラスト</span>
                </div>
              )}
            </div>
            
            {/* 中央テキスト - 固定幅で両サイドに均等な余白 */}
            <div className="w-3/5 px-2 text-center">
              <p className="text-base">
                ご要望に合わせて厳選した <span className="text-[#eb6832] font-bold">最大4社</span>をご紹介しますので、
              </p>
              <p className="text-xl font-bold text-[#eb6832]">『比較検討』してください</p>
              <p className="text-base">1分で簡単入力！相談だけでもOK</p>
            </div>
            
            {/* 右側のイラスト - PCでは大きく、スマホでは小さく */}
            <div className="w-1/5 pl-2 flex justify-center">
              {!imageError.rightIllustration ? (
                <Image 
                  src="/images/illustration-right.png" 
                  alt="担当者" 
                  width={90}
                  height={90}
                  className="object-contain w-auto h-auto md:w-[120px] md:h-[120px]"
                  onError={() => handleImageError('rightIllustration')}
                />
              ) : (
                <div className="w-20 h-20 md:w-28 md:h-28 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-400 text-xs">イラスト</span>
                </div>
              )}
            </div>
          </div>

          {/* 無料ボタン */}
          <div className="flex justify-center mb-10">
            <a href="#" className="relative inline-flex items-center px-6 py-3 bg-[#eb6832] text-white rounded-md text-sm sm:text-lg font-medium whitespace-nowrap w-auto max-w-[90vw] sm:max-w-none">
              <span className="absolute left-2 top-1/2 -translate-y-1/2 bg-red-500 text-white px-2 py-1 text-xs rounded-md font-bold">
                無料
              </span>
              <span className="ml-8 text-center">
                優良リフォーム会社の<br className="hidden sm:block" />ご紹介はこちら
              </span>
            </a>
          </div>

          {/* 新サービスセクション */}
          <div className="mt-14">
            <div className="relative">
              <div className="absolute -top-4 left-0 z-10">
                <span className="bg-red-600 text-white px-4 py-1 rounded-md text-sm font-bold">新サービス</span>
              </div>
              <div className="border border-[#eb6832] bg-[#fff9f0] p-4 rounded-lg text-center">
                <p className="text-lg font-medium text-[#eb6832]">まずはイメージを膨らませたい方は<br />こちら</p>
              </div>
            </div>
            
            {/* Before/After比較表示 */}
            <div className="mt-6">
              {/* 横並び比較表示 */}
              <div className="flex flex-row space-x-4 justify-center">
                {/* Before画像 */}
                <div className="flex-1 max-w-[45%] relative">
                  <div className="relative h-48 rounded-lg overflow-hidden shadow-md">
                    {!imageError.beforeRoom ? (
                      <Image 
                        src="/images/before-room.jpg" 
                        alt="リフォーム前" 
                        fill
                        sizes="(max-width: 768px) 45vw, 300px"
                        className="object-cover"
                        onError={() => handleImageError('beforeRoom')}
                        priority
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-gray-500">Before画像</span>
                      </div>
                    )}
                    <div className="absolute top-2 left-2 bg-gray-800 bg-opacity-70 text-white px-3 py-1 rounded-md">
                      Before
                    </div>
                  </div>
                </div>
                
                {/* After画像 */}
                <div className="flex-1 max-w-[45%] relative">
                  <div className="relative h-48 rounded-lg overflow-hidden shadow-md">
                    {!imageError.afterRoom ? (
                      <Image 
                        src="/images/after-room.jpg" 
                        alt="リフォーム後" 
                        fill
                        sizes="(max-width: 768px) 45vw, 300px"
                        className="object-cover"
                        onError={() => handleImageError('afterRoom')}
                        priority
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-300 rounded-lg flex items-center justify-center">
                        <span className="text-gray-600">After画像</span>
                      </div>
                    )}
                    <div className="absolute top-2 left-2 bg-gray-800 bg-opacity-70 text-white px-3 py-1 rounded-md">
                      After
                    </div>
                  </div>
                </div>
              </div>
              
              {/* 説明文とボタン */}
              <div className="mt-6 text-center">
                <p className="mb-6">壁・床・ドアなど、好きな素材を選んで、<br />
                リフォーム後イメージを簡単に作成できます。</p>
                <Link href="/1-upload" className="inline-flex items-center px-6 py-3 border border-[#eb6832] text-[#eb6832] rounded-md hover:bg-orange-50 transition">
                  理想のお部屋イメージ画像を作る
                </Link>
              </div>
            </div>
          </div>

          {/* 参考画像セクション */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-center mb-4">参考画像から選びたい方へ</h2>
            <p className="text-center mb-8">リフォームしたい箇所や好きなスタイルを選び<br />その中からあなたが理想とする<br />お部屋のイメージ画像を見つけてください。</p>
            
            {/* 画像ギャラリー */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {styles.map((style, index) => (
                <div key={index} className="relative overflow-hidden rounded-lg group cursor-pointer">
                  {!styleImagesError[index] ? (
                    <Image 
                      src={style.src}
                      alt={style.name} 
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover"
                      onError={() => handleStyleImageError(index)}
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">{style.name}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <a href="#" className="inline-block px-6 py-2 text-gray-700 hover:text-gray-900">
                イメージ画像を探す
              </a>
            </div>
          </div>

          {/* 安心マークセクション */}
          <div className="mt-16 text-center">
            <div className="flex justify-center mb-4">
              {!imageError.securityBadge ? (
                <Image 
                  src="/images/security-badge.png" 
                  alt="安心リフォームの証" 
                  width={100}
                  height={100}
                  onError={() => handleImageError('securityBadge')}
                />
              ) : (
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                </div>
              )}
            </div>
            <h3 className="text-lg font-bold mb-4">このマークは安心リフォームの証</h3>
            <p className="mb-2">国土交通省の制度に登録された優良な団体と<br />その団体の構成員である<br />リフォーム業者だけが使用できます</p>
            <p className="text-[#eb6832] font-medium">この印の会社は<span className="font-bold">安心</span>リフォームのマークです。</p>
          </div>
        </div>
      </main>

      {/* フッター */}
      <footer className="bg-black text-white py-6 mt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-6 mb-4 text-sm">
            <a href="#" className="hover:underline">利用規約</a>
            <a href="#" className="hover:underline">プライバシーポリシー</a>
            <a href="#" className="hover:underline">お問い合わせ</a>
            <a href="#" className="hover:underline">企業情報</a>
          </div>
          <div className="flex justify-center items-center">
            {!imageError.logoWhite ? (
              <Image 
                src="/images/logo-white.png" 
                alt="リフォトル" 
                width={30} 
                height={30} 
                className="mr-2"
                onError={() => handleImageError('logoWhite')}
              />
            ) : (
              <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center mr-2">
                <span className="text-white text-xs">ロゴ</span>
              </div>
            )}
            <span className="text-sm">© 2024 TOPPAN Inc.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}