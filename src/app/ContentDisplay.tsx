  import { Twitter, Instagram, Linkedin } from 'lucide-react';

  interface ContentDisplayProps {
    content: {
      twitter: string;
      instagram: string;
      linkedin: string;
    };
  }


  const SocialPost = ({ title, content, icon }: { title: string; content: string; icon: React.ReactNode }) => {
    return (
      
      <div className="bg-white/80 backdrop-blur-sm p-5 rounded-xl border border-slate-200 shadow-sm transition-all hover:shadow-md">
        <div className="flex items-center mb-3">
          {icon}
          <h3 className="text-lg font-bold text-black ml-3">{title}</h3>
        </div>
        <p className="text-black whitespace-pre-wrap text-base">{content}</p>
      
      </div>
    );
  };

  const ContentDisplay: React.FC<ContentDisplayProps> = ({ content }) => {
    return (
      <div className="mt-8 w-full p-2 md:p-0">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-black">Sua Dose de Criatividade!</h2>
          <p className="text-black mt-1">Aqui estão suas sugestões de posts.</p> {/* Mensagem ajustada */}
        </div>
        <div className="space-y-6">
          <SocialPost 
            title="X (Twitter)" 
            content={content.twitter} 
            icon={<Twitter className="h-7 w-7 text-sky-500" />} 
          />
          <SocialPost 
            title="Instagram" 
            content={content.instagram} 
            icon={<Instagram className="h-7 w-7 text-pink-500" />}
          />
          <SocialPost 
            title="LinkedIn" 
            content={content.linkedin} 
            icon={<Linkedin className="h-7 w-7 text-blue-700" />}
          />
        </div>
      </div>
    );
  };

  export default ContentDisplay;