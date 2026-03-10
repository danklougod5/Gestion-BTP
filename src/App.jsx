import React, { useState } from 'react';
import {
  BarChart3,
  MapPin,
  CloudRain,
  Truck,
  Users,
  LayoutDashboard,
  Calendar,
  ShieldAlert,
  Search,
  Plus,
  ArrowUpRight,
  Droplets,
  HardHat,
  Ship,
  Wallet,
  Bell,
  Settings,
  ChevronRight,
  MessageSquare,
  FileText,
  CheckSquare,
  Undo2,
  Trash2,
  Send
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster, toast } from 'sonner';
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  Sidebar as ChatSidebar,
  Search as ChatSearch,
  ConversationList,
  Conversation,
  Avatar,
  ConversationHeader,
  VoiceCallButton,
  VideoCallButton,
  InfoButton,
  TypingIndicator,
  MessageSeparator
} from "@chatscope/chat-ui-kit-react";

const handleInteraction = (label, description = "Ouverture du module...") => {
  toast.success(label, {
    description: description,
    duration: 3000,
  });
};

const StatCard = ({ title, value, icon: Icon, color, trend }) => (
  <motion.div
    whileHover={{ y: -5, scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={() => handleInteraction(`Analyse : ${title}`, `Visualisation des données détaillées pour ${value}.`)}
    className="glass-card flex justify-between items-start cursor-pointer active:bg-slate-50 transition-colors"
  >
    <div>
      <p className="text-btp-secondary text-sm font-medium">{title}</p>
      <h3 className="text-2xl mt-1 tracking-tight">{value}</h3>
      {trend && (
        <div className="flex items-center gap-1 mt-2">
          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${trend > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
          </span>
          <span className="text-[10px] text-btp-secondary font-medium">vs mois dernier</span>
        </div>
      )}
    </div>
    <div className="p-3 rounded-xl" style={{ backgroundColor: `${color}15`, color: color }}>
      <Icon size={24} />
    </div>
  </motion.div>
);

const ProjectRow = ({ name, location, progress, status }) => (
  <motion.div
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    whileHover={{ x: 5, backgroundColor: 'rgba(248, 250, 252, 0.8)' }}
    whileTap={{ scale: 0.995 }}
    onClick={() => handleInteraction(`Projet : ${name}`, `Chargement du dossier technique (Location: ${location})`)}
    className="flex items-center py-4 px-4 -mx-4 rounded-xl border-b border-slate-100 last:border-0 group cursor-pointer transition-colors"
  >
    <div className="flex-1">
      <p className="font-semibold text-slate-800 group-hover:text-btp-cta transition-colors">{name}</p>
      <div className="flex items-center gap-1 text-[11px] text-btp-secondary mt-0.5 uppercase tracking-wider font-medium">
        <MapPin size={10} /> {location}
      </div>
    </div>
    <div className="w-32 px-4">
      <div className="flex justify-between text-[10px] mb-1 font-bold text-slate-500">
        <span>Progression</span>
        <span>{progress}%</span>
      </div>
      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, delay: 0.5 }}
          className="h-full bg-btp-cta rounded-full"
        />
      </div>
    </div>
    <div className="w-24 text-right">
      <span className={`status-badge status-${status}`}>
        {status === 'active' ? 'En cours' : status === 'warning' ? 'Retard' : 'Urgent'}
      </span>
    </div>
    <ChevronRight size={16} className="text-slate-300 ml-4 group-hover:text-btp-cta transition-colors" />
  </motion.div>
);

const SidebarItem = ({ id, icon: Icon, label, activeTab, setActiveTab }) => (
  <button
    onClick={() => setActiveTab(id)}
    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative ${activeTab === id
      ? 'bg-slate-900 text-white shadow-lg shadow-slate-200'
      : 'text-btp-secondary hover:bg-slate-50 hover:text-slate-900'
      }`}
  >
    <Icon size={20} className={activeTab === id ? 'text-btp-cta' : 'group-hover:text-btp-cta transition-colors'} />
    <span className="font-semibold text-sm">{label}</span>
    {activeTab === id && (
      <motion.div
        layoutId="sidebar-active"
        className="absolute left-0 w-1 h-6 bg-btp-cta rounded-r-full"
      />
    )}
  </button>
);

const DashboardView = () => (
  <>
    <header className="flex justify-between items-center mb-10">
      <div>
        <div className="flex items-center gap-2 text-[10px] text-btp-secondary font-bold uppercase tracking-widest mb-1">
          <Calendar size={12} /> 10 Mars 2026 • Abidjan, CI
        </div>
        <h1 className="text-4xl tracking-tight font-heading font-bold">Vue d'ensemble</h1>
        <p className="text-btp-secondary font-medium mt-1">Surveillez vos opérations en temps réel sur le territoire national.</p>
      </div>
      <div className="flex gap-3">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-btp-cta transition-colors" size={18} />
          <input
            type="text"
            placeholder="N° Chantier, Ouvrier, Facture..."
            onKeyDown={(e) => e.key === 'Enter' && handleInteraction("Recherche", `Lancement de la recherche globale pour "${e.target.value}"...`)}
            className="pl-11 pr-6 py-3.5 rounded-xl border border-slate-200 bg-white shadow-sm focus:outline-none focus:ring-4 focus:ring-btp-cta/5 focus:border-btp-cta transition-all w-72 text-sm font-medium text-btp-text"
          />
        </div>
        <button
          onClick={() => handleInteraction("Notifications", "Aucune nouvelle notification urgente.")}
          className="w-12 h-12 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-btp-cta hover:border-btp-cta active:scale-90 transition-all relative"
        >
          <Bell size={20} />
          <span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        <button
          onClick={() => handleInteraction("Configuration", "Initialisation de l'assistant de création de projet...")}
          className="btn-primary flex items-center gap-2 shadow-lg shadow-orange-100 active:scale-95 transition-transform"
        >
          <Plus size={20} /> <span className="hidden xl:inline">Nouveau Projet</span>
        </button>
      </div>
    </header>

    {/* Stats Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      <StatCard title="Chantiers Actifs" value="12" icon={BarChart3} color="#F97316" trend={8} />
      <StatCard title="Main d'œuvre Live" value="482" icon={Users} color="#64748B" trend={12} />
      <StatCard title="Budget Total (CFA)" value="845.2M" icon={Wallet} color="#10B981" trend={-2} />
      <StatCard title="Imports Douane" value="24" icon={Ship} color="#3B82F6" />
    </div>

    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
      {/* Recent Projects */}
      <div className="xl:col-span-2 glass-card">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h3 className="text-xl font-heading font-bold">Chantiers Prioritaires</h3>
            <p className="text-[11px] text-btp-secondary font-bold uppercase tracking-wider mt-1">Focus du jour : Sécurité & Délais</p>
          </div>
          <button className="text-btp-cta text-xs font-bold hover:underline flex items-center gap-1">
            Voir tout <ArrowUpRight size={14} />
          </button>
        </div>
        <div className="flex flex-col">
          <ProjectRow name="Autoroute Abidjan-Bassam" location="Secteur B1 • Grand-Bassam" progress={75} status="active" />
          <ProjectRow name="Pont Cocody-Plateau" location="Baie de Cocody • Abidjan" progress={45} status="warning" />
          <ProjectRow name="Barrage Buyo (Extension)" location="Zone Rurale • Ouest CI" progress={20} status="error" />
          <ProjectRow name="Logements Sociaux Anyama" location="Périphérie Nord • Anyama" progress={90} status="active" />
        </div>
      </div>

      {/* AI Insights Sidebar */}
      <div className="flex flex-col gap-6">
        <div className="glass-card bg-slate-900 text-white border-0 shadow-2xl shadow-slate-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-btp-cta/20 rounded-lg">
              <ShieldAlert size={20} className="text-btp-cta" />
            </div>
            <div>
              <h3 className="text-white text-lg font-heading font-bold">IA Prédictive</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest font-heading">Alertes Système</p>
            </div>
          </div>

          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleInteraction("Alerte Logistique", "Contact du fournisseur Holcim en cours...")}
              className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-btp-cta/30 transition-colors cursor-pointer"
            >
              <p className="font-bold text-xs text-orange-400 uppercase tracking-widest">Retard Logistique Douane</p>
              <p className="text-[11px] text-slate-400 mt-2 leading-relaxed font-medium">
                Congestion critique au terminal TC2.
                Livraison <span className="text-white">Ciment Holcim</span> estimée à +48h.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleInteraction("Optimisation", "Planification du ravitaillement pour la flotte Bouaké...")}
              className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-green-400/30 transition-colors cursor-pointer"
            >
              <p className="font-bold text-xs text-green-400 uppercase tracking-widest">Optimisation Carburant</p>
              <p className="text-[11px] text-slate-400 mt-2 leading-relaxed font-medium">
                Gasoil (-2%) détecté. Suggestion :
                Ravitaillement anticipé flotte Bouaké.
              </p>
            </motion.div>
          </div>

          <button
            onClick={() => handleInteraction("Analyse IA", "Lancement d'un scan complet des risques opérationnels...")}
            className="w-full mt-6 py-3 rounded-xl bg-slate-800 text-xs font-bold hover:bg-btp-cta transition-colors text-slate-300 hover:text-white active:scale-95"
          >
            Analyser tous les risques
          </button>
        </div>

        <div className="glass-card relative overflow-hidden group h-full min-h-[300px] flex flex-col">
          <div className="relative z-10 flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-heading font-bold">Suivi GPS Live</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-[10px] text-btp-secondary font-bold uppercase tracking-wider">45 Sites Actifs</span>
              </div>
            </div>
            <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-btp-cta group-hover:text-white transition-colors">
              <MapPin size={18} />
            </div>
          </div>

          <div className="flex-1 bg-slate-100 rounded-xl relative overflow-hidden border border-slate-200">
            <div className="absolute inset-0 opacity-40 mix-blend-multiply italic text-[8px] p-4 flex flex-wrap gap-4 text-slate-300 font-black pointer-events-none uppercase">
              {Array.from({ length: 40 }).map((_, i) => (
                <span key={i}>Abidjan Bassam Yamoussoukro San-Pedro Bouaké</span>
              ))}
            </div>

            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              whileHover={{ scale: 1.5, zIndex: 10 }}
              onClick={(e) => { e.stopPropagation(); handleInteraction("Marqueur : Chantier Bassam", "Statut: En cours. Progression: 75%"); }}
              className="absolute top-1/4 left-1/3 w-4 h-4 bg-btp-cta rounded-full border-2 border-white shadow-lg cursor-pointer z-0"
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
              whileHover={{ scale: 1.5, zIndex: 10 }}
              onClick={(e) => { e.stopPropagation(); handleInteraction("Marqueur : Pont Cocody", "Statut: Alerte. Matériaux en attente."); }}
              className="absolute top-1/2 left-1/2 w-4 h-4 bg-btp-cta rounded-full border-2 border-white shadow-lg cursor-pointer z-0"
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2, delay: 1 }}
              whileHover={{ scale: 1.5, zIndex: 10 }}
              onClick={(e) => { e.stopPropagation(); handleInteraction("Marqueur : Barrage Buyo", "Statut: Urgent. Retard détecté."); }}
              className="absolute bottom-1/3 right-1/4 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-lg cursor-pointer z-0"
            />

            <div
              onClick={() => handleInteraction("Pointage", "Ouverture du détail de l'Equipe Alpha...")}
              className="absolute bottom-4 left-4 right-4 p-3 bg-white/90 backdrop-blur rounded-lg border border-slate-200 shadow-sm cursor-pointer hover:bg-white transition-colors active:scale-95"
            >
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Dernier Pointage</p>
              <p className="text-xs font-bold mt-1">Equipe Alpha • Pont Cocody</p>
              <p className="text-[10px] text-btp-secondary font-medium">Il y a 3 minutes • GPS : 5.3484, -4.0197</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);

const ProjectDetailView = ({ project, onBack }) => {
  const [activeTab, setActiveTab] = useState('notes');
  const [newNote, setNewNote] = useState('');
  const [notes, setNotes] = useState([
    { id: 1, user: "Jean-Marc Koné", text: "Vérification des fondations terminée. RAS.", date: "10/03/2026 09:15" },
    { id: 2, user: "Koffi N'Goran", text: "Besoin de 5 tonnes de gravier supplémentaires pour demain.", date: "10/03/2026 11:30" }
  ]);

  const [tasks, setTasks] = useState([
    { id: 1, text: "Coulage dalle R+1", completed: false },
    { id: 2, text: "Vérification étanchéité", completed: true },
    { id: 3, text: "Installation échafaudages", completed: false }
  ]);

  const addNote = () => {
    if (!newNote.trim()) return;
    setNotes([{ id: Date.now(), user: "Directeur Technique", text: newNote, date: "À l'instant" }, ...notes]);
    setNewNote('');
    handleInteraction("Note ajoutée", "Votre commentaire a été enregistré sur le projet.");
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    handleInteraction("Tâche mise à jour", "Le statut de la tâche a été modifié.");
  };

  return (
    <div className="max-w-5xl mx-auto">
      <button
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-slate-500 hover:text-btp-cta font-bold text-sm transition-colors group"
      >
        <Undo2 size={18} className="group-hover:-translate-x-1 transition-transform" /> Retour aux chantiers
      </button>

      <header className="mb-8 flex justify-between items-start">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-4xl font-heading font-bold tracking-tight">{project.name}</h1>
            <span className={`status-badge status-${project.status}`}>{project.status}</span>
          </div>
          <p className="text-btp-secondary font-medium flex items-center gap-1">
            <MapPin size={14} /> {project.city} • Budget : {project.budget} CFA
          </p>
        </div>
        <div className="flex gap-2">
          <button className="p-3 bg-white border border-slate-200 rounded-xl hover:text-btp-cta transition-colors"><Settings size={20} /></button>
          <button className="btn-primary">Partager le dossier</button>
        </div>
      </header>

      <div className="flex gap-6 border-b border-slate-200 mb-8">
        {[
          { id: 'notes', label: 'Notes & Journal', icon: MessageSquare },
          { id: 'tasks', label: 'Tâches & Suivi', icon: CheckSquare },
          { id: 'docs', label: 'Documents', icon: FileText }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-3 font-bold text-sm transition-all relative ${activeTab === tab.id ? 'text-btp-cta' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <tab.icon size={18} />
            {tab.label}
            {activeTab === tab.id && <motion.div layoutId="detail-tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-btp-cta" />}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {activeTab === 'notes' && (
            <div className="space-y-6">
              <div className="glass-card bg-slate-50 border-slate-200">
                <textarea
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Laissez une note ou une instruction pour ce chantier..."
                  className="w-full bg-transparent border-0 focus:ring-0 text-sm font-medium resize-none h-24"
                />
                <div className="flex justify-end mt-2">
                  <button onClick={addNote} className="btn-primary py-2 px-4 text-xs">Publier la note</button>
                </div>
              </div>
              <div className="space-y-4">
                {notes.map(note => (
                  <div key={note.id} className="glass-card hover:border-slate-300 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-bold text-sm">{note.user}</p>
                      <span className="text-[10px] text-slate-400 font-bold">{note.date}</span>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed font-medium">{note.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'tasks' && (
            <div className="glass-card">
              <h3 className="font-heading font-bold mb-6">Liste de Contrôle du Chantier</h3>
              <div className="space-y-3">
                {tasks.map(task => (
                  <div
                    key={task.id}
                    onClick={() => toggleTask(task.id)}
                    className="flex items-center gap-3 p-4 rounded-xl border border-slate-100 hover:bg-slate-50 cursor-pointer transition-all"
                  >
                    <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors ${task.completed ? 'bg-green-500 border-green-500 text-white' : 'border-slate-200'}`}>
                      {task.completed && <CheckSquare size={14} />}
                    </div>
                    <span className={`text-sm font-semibold ${task.completed ? 'line-through text-slate-400' : 'text-slate-700'}`}>{task.text}</span>
                  </div>
                ))}
              </div>
              <button className="w-full mt-6 py-3 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 text-xs font-bold hover:border-btp-cta hover:text-btp-cta transition-all flex items-center justify-center gap-2">
                <Plus size={16} /> Ajouter une tâche
              </button>
            </div>
          )}

          {activeTab === 'docs' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { name: "Plan de Masse.pdf", size: "4.2 MB", type: "PDF" },
                { name: "Devis Descriptif.docx", size: "1.5 MB", type: "DOC" },
                { name: "Planning GANTT.xlsx", size: "2.1 MB", type: "XLS" },
                { name: "Photo_Site_Mars.jpg", size: "8.9 MB", type: "IMG" }
              ].map((doc, i) => (
                <div key={i} className="glass-card flex items-center gap-4 hover:border-btp-cta/30 cursor-pointer group">
                  <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-btp-cta/10 group-hover:text-btp-cta transition-colors">
                    <FileText size={24} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold truncate">{doc.name}</p>
                    <p className="text-[10px] text-btp-secondary font-bold uppercase">{doc.size} • {doc.type}</p>
                  </div>
                </div>
              ))}
              <div className="border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center p-6 text-slate-400 hover:border-btp-cta hover:text-btp-cta cursor-pointer transition-all">
                <Plus size={32} />
                <span className="text-xs font-bold mt-2 uppercase tracking-widest">Uploader un document</span>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="glass-card bg-slate-900 text-white border-0">
            <h3 className="font-heading font-bold mb-4">Statut Financier</h3>
            <div className="space-y-4">
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Budget Total</p>
                <p className="text-2xl font-bold">{project.budget} CFA</p>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-btp-cta w-2/3"></div>
              </div>
              <div className="flex justify-between text-[10px] font-bold text-slate-400">
                <span>Dépensé : 65%</span>
                <span>Restant : 35%</span>
              </div>
            </div>
          </div>
          <div className="glass-card">
            <h3 className="font-heading font-bold mb-4">Équipe Assignée</h3>
            <div className="space-y-3">
              {[
                { name: "Moussa Diakité", role: "Chef de Chantier" },
                { name: "Alice Kouassi", role: "Architecte" },
                { name: "Karim Ouattara", role: "Ingénieur Structure" }
              ].map((member, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-200"></div>
                  <div>
                    <p className="text-xs font-bold">{member.name}</p>
                    <p className="text-[10px] text-btp-secondary">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectsView = ({ onSelectProject }) => (
  <div className="max-w-6xl mx-auto">
    <header className="mb-10">
      <h1 className="text-4xl font-heading font-bold tracking-tight">Gestion des Chantiers</h1>
      <p className="text-btp-secondary font-medium mt-1">Portefeuille complet des projets d'infrastructure en Côte d'Ivoire.</p>
    </header>

    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
      <div className="lg:col-span-3 flex gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Rechercher un projet par nom, ville ou n° de contrat..."
            className="w-full pl-11 pr-6 py-3.5 rounded-xl border border-slate-200 bg-white shadow-sm focus:outline-none focus:ring-4 focus:ring-btp-cta/5 focus:border-btp-cta transition-all text-sm font-medium"
          />
        </div>
        <button
          onClick={() => handleInteraction("Filtres", "Ouverture du panneau de filtrage avancé...")}
          className="px-6 py-3.5 bg-white border border-slate-200 rounded-xl font-bold text-sm text-slate-600 hover:border-btp-cta hover:text-btp-cta active:scale-95 transition-all flex items-center gap-2"
        >
          Filtrer
        </button>
      </div>
      <button
        onClick={() => handleInteraction("Nouveau Chantier", "Initialisation de l'assistant de planification...")}
        className="btn-primary flex items-center justify-center gap-2 active:scale-95 transition-transform"
      >
        <Plus size={20} /> Nouveau Chantier
      </button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[
        { name: "Barrage de Soubré 2", city: "Soubré", progress: 35, budget: "120B", status: "active" },
        { name: "Échangeur Akwaba", city: "Abidjan", progress: 62, budget: "45B", status: "active" },
        { name: "Stade San Pedro", city: "San Pedro", progress: 98, budget: "32B", status: "warning" },
        { name: "Centrale Solaire", city: "Boundiali", progress: 15, budget: "18B", status: "active" },
        { name: "CHU de Yamoussoukro", city: "Yamoussoukro", progress: 40, budget: "55B", status: "error" },
        { name: "Pont Tiassalé", city: "Tiassalé", progress: 100, budget: "12B", status: "active" }
      ].map((p, i) => (
        <motion.div
          key={i}
          whileHover={{ y: -5, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelectProject(p)}
          className="glass-card cursor-pointer hover:border-btp-cta/30 transition-colors"
        >
          <div className="flex justify-between items-start mb-4">
            <div className={`p-2 rounded-lg ${p.status === 'active' ? 'bg-green-100 text-green-600' : p.status === 'warning' ? 'bg-orange-100 text-orange-600' : 'bg-red-100 text-red-600'}`}>
              <HardHat size={20} />
            </div>
            <span className={`status-badge status-${p.status}`}>
              {p.status === 'active' ? 'En cours' : p.status === 'warning' ? 'Vérification' : 'Retard'}
            </span>
          </div>
          <h4 className="text-lg font-bold font-heading mb-1">{p.name}</h4>
          <div className="flex items-center gap-1 text-[11px] text-btp-secondary font-bold uppercase tracking-wider mb-6">
            <MapPin size={12} /> {p.city}
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-1.5 font-bold">
                <span className="text-slate-400">Progression</span>
                <span>{p.progress}%</span>
              </div>
              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-btp-cta" style={{ width: `${p.progress}%` }}></div>
              </div>
            </div>
            <div className="pt-4 border-t border-slate-100 flex justify-between items-end">
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase">Budget Débloqué</p>
                <p className="text-sm font-bold">{p.budget} CFA</p>
              </div>
              <button className="text-btp-cta hover:translate-x-1 transition-transform">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

const ChatView = () => {
  const [msgInputValue, setMsgInputValue] = useState("");
  const [activeConversation, setActiveConversation] = useState(0);

  const conversations = [
    { name: "Canal Général", lastMsg: "Attention aux orages sur San Pedro...", status: "available", avatar: null, unread: 2 },
    { name: "Direction Technique", lastMsg: "Le planning a été mis à jour.", status: "dnd", avatar: "JM", info: "Jean-Marc Koné" },
    { name: "Chantier Bassam", lastMsg: "Béton livré à 14:00.", status: "available", avatar: "B", info: "Moussa Diakité" },
    { name: "Equipe RH", lastMsg: "Fiches de paie prêtes.", status: "away", avatar: "RH" }
  ];

  return (
    <div className="max-w-6xl mx-auto h-[calc(100vh-120px)] flex flex-col">
      <header className="mb-6">
        <h1 className="text-3xl font-heading font-bold">Centre de Communication</h1>
        <p className="text-btp-secondary text-sm font-medium">Collaboration Teams-style pour vos équipes BTP.</p>
      </header>

      <div className="flex-1 rounded-2xl shadow-2xl overflow-hidden border border-slate-200 bg-white flex" style={{ height: "600px" }}>
        <MainContainer responsive>
          <ChatSidebar position="left" scrollable={false} className="border-r border-slate-100" style={{ width: '300px' }}>
            <ChatSearch placeholder="Rechercher une conversation..." className="p-4" />
            <ConversationList>
              {conversations.map((c, i) => (
                <Conversation
                  key={i}
                  name={c.name}
                  lastSenderName={c.info || "Système"}
                  info={c.lastMsg}
                  active={activeConversation === i}
                  onClick={() => setActiveConversation(i)}
                  unreadDot={c.unread > 0}
                >
                  <Avatar name={c.avatar || c.name[0]} status={c.status} />
                </Conversation>
              ))}
            </ConversationList>
          </ChatSidebar>

          <ChatContainer className="bg-slate-50/30">
            <ConversationHeader>
              <ConversationHeader.Back />
              <Avatar name={conversations[activeConversation].avatar || conversations[activeConversation].name[0]} status={conversations[activeConversation].status} />
              <ConversationHeader.Content
                userName={conversations[activeConversation].name}
                info={`Dernier message : ${conversations[activeConversation].lastMsg}`}
              />
              <ConversationHeader.Actions>
                <VoiceCallButton onClick={() => handleInteraction("Appel Vocal", "Initialisation sécurisée...")} />
                <VideoCallButton onClick={() => handleInteraction("Vidéoconférence", "Ouverture du salon virtuel...")} />
                <InfoButton onClick={() => handleInteraction("Infos Groupe", "Accès aux fichiers partagés...")} />
              </ConversationHeader.Actions>
            </ConversationHeader>

            <MessageList typingIndicator={<TypingIndicator content="Alice est en train d'écrire" />}>
              <MessageSeparator content="Aujourd'hui" />
              <Message
                model={{
                  message: "Bonjour à tous, point météo : attention aux orages sur San Pedro cet après-midi.",
                  sentTime: "08:30",
                  sender: "Jean-Marc Koné",
                  direction: "incoming",
                  position: "single"
                }}
              >
                <Avatar name="JM" src="https://chatscope.io/storybook/react/static/media/zoe.e31d48a5.svg" />
              </Message>
              <Message
                model={{
                  message: "Bien reçu, on a sécurisé les grues. Le béton a déjà pris.",
                  sentTime: "09:12",
                  sender: "Moussa Diakité",
                  direction: "incoming",
                  position: "single"
                }}
              >
                <Avatar name="M" />
              </Message>
              <Message
                model={{
                  message: "Parfait. Quelqu'un peut envoyer les photos du site Anyama ?",
                  sentTime: "10:05",
                  sender: "Moi",
                  direction: "outgoing",
                  position: "single"
                }}
              />
              <Message
                model={{
                  message: "Je les uploade dans la section Documents du projet tout de suite !",
                  sentTime: "10:08",
                  sender: "Alice Kouassi",
                  direction: "incoming",
                  position: "last"
                }}
              >
                <Avatar name="A" />
              </Message>
            </MessageList>

            <MessageInput
              placeholder="Écrivez votre message ici..."
              value={msgInputValue}
              onChange={val => setMsgInputValue(val)}
              onSend={() => {
                setMsgInputValue("");
                handleInteraction("Message Envoyé", "Votre message a été diffusé sur le canal.");
              }}
              attachButton={true}
            />
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
};

const ActionsView = () => (
  <div className="max-w-5xl mx-auto">
    <header className="mb-10">
      <h1 className="text-4xl font-heading font-bold tracking-tight">Actions en Attente</h1>
      <p className="text-btp-secondary font-medium mt-1">Liste consolidée des tâches et validations prioritaires sur tous vos sites.</p>
    </header>

    <div className="grid grid-cols-1 gap-4">
      {[
        { title: "Valider facture Ciment Holcim", project: "Echangeur Akwaba", priority: "high", date: "Demain" },
        { title: "Rapport HSE mensuel", project: "CHU Yamoussoukro", priority: "medium", date: "12 Mars" },
        { title: "Approuver devis climatisation", project: "Logements Anyama", priority: "low", date: "15 Mars" },
        { title: "Contrôle technique grue G1", project: "Pont Cocody", priority: "high", date: "Aujourd'hui" }
      ].map((action, i) => (
        <div key={i} className="glass-card flex items-center justify-between group hover:border-slate-300 transition-colors">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold ${action.priority === 'high' ? 'bg-red-100 text-red-600' : action.priority === 'medium' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'}`}>
              {action.priority === 'high' ? '!!!' : action.priority === 'medium' ? '!!' : '!'}
            </div>
            <div>
              <h3 className="font-bold text-slate-900 group-hover:text-btp-cta transition-colors">{action.title}</h3>
              <p className="text-xs text-btp-secondary font-medium uppercase tracking-wider">{action.project} • Échéance : {action.date}</p>
            </div>
          </div>
          <button className="px-6 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold active:scale-95 transition-transform">Marquer comme fait</button>
        </div>
      ))}
    </div>
  </div>
);

const GpsView = () => (
  <div className="h-full flex flex-col">
    <header className="mb-6 flex justify-between items-center">
      <div>
        <h1 className="text-4xl font-heading font-bold tracking-tight">Suivi GPS Live</h1>
        <p className="text-btp-secondary font-medium mt-1">Localisation en temps réel de la flotte et des engins lourds.</p>
      </div>
      <div className="flex gap-2">
        <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-xs font-bold flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          82 Véhicules Connectés
        </span>
        <span className="px-4 py-2 bg-slate-100 text-slate-600 rounded-full text-xs font-bold">
          4 Alertes Hors-Zone
        </span>
      </div>
    </header>

    <div className="flex-1 flex gap-6 min-h-0">
      <div className="w-80 flex flex-col gap-4 overflow-y-auto pr-2">
        {[
          { id: "MX-204", type: "Bulldozer", driver: "K. Kouadio", site: "Abidjan-Bassam", speed: "12 km/h", status: "active" },
          { id: "TR-502", type: "Camion Benne", driver: "A. Diallo", site: "Yamoussoukro", speed: "45 km/h", status: "active" },
          { id: "EX-101", type: "Excavatrice", driver: "S. Traoré", site: "Buyo", speed: "0 km/h", status: "error" },
          { id: "MX-205", type: "Niveleuse", driver: "P. Yao", site: "Cocody", speed: "8 km/h", status: "active" },
          { id: "TR-508", type: "Camion Ciment", driver: "M. Bakayoko", site: "Anyama", speed: "32 km/h", status: "warning" }
        ].map((v, i) => (
          <motion.div
            key={i}
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleInteraction(`Véhicule : ${v.id}`, `Chauffeur : ${v.driver} | Vitesse : ${v.speed}`)}
            className="glass-card p-4 hover:border-btp-cta/30 transition-colors cursor-pointer group"
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] font-black bg-slate-100 px-2 py-0.5 rounded text-slate-500 group-hover:bg-btp-cta/10 group-hover:text-btp-cta transition-colors">{v.id}</span>
              <div className={`w-2 h-2 rounded-full ${v.status === 'active' ? 'bg-green-500' : v.status === 'warning' ? 'bg-orange-500' : 'bg-red-500'}`}></div>
            </div>
            <p className="font-bold text-sm tracking-tight">{v.type}</p>
            <p className="text-[11px] text-btp-secondary font-medium">{v.driver} • {v.site}</p>
            <div className="mt-4 flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <span>Vitesse</span>
              <span className="text-slate-900">{v.speed}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex-1 bg-slate-200 rounded-3xl relative overflow-hidden shadow-inner border border-slate-300">
        {/* Mock Map Background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none grid grid-cols-12 grid-rows-12 gap-1 p-4">
          {Array.from({ length: 144 }).map((_, i) => (
            <div key={i} className="border border-slate-400/20 rounded-sm"></div>
          ))}
        </div>

        {/* Visual Paths */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
          <path d="M100 200 L300 400 L500 350 L700 500" stroke="#F97316" strokeWidth="4" fill="none" strokeDasharray="8,8" />
          <path d="M50 500 L250 300 L600 200" stroke="#334155" strokeWidth="4" fill="none" strokeDasharray="8,8" />
        </svg>

        {/* Vehicle Markers */}
        <motion.div drag whileHover={{ scale: 1.2 }} className="absolute top-1/4 left-1/3 p-2 bg-btp-cta text-white rounded-lg shadow-xl cursor-grab active:cursor-grabbing">
          <Truck size={20} />
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white text-slate-900 px-2 py-1 rounded text-[10px] font-bold shadow-sm border border-slate-100">TR-502 : 45 km/h</div>
        </motion.div>

        <motion.div drag whileHover={{ scale: 1.2 }} className="absolute bottom-1/3 right-1/4 p-2 bg-slate-900 text-white rounded-lg shadow-xl cursor-grab active:cursor-grabbing">
          <HardHat size={20} className="text-btp-cta" />
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white text-slate-900 px-2 py-1 rounded text-[10px] font-bold shadow-sm border border-slate-100">MX-204 : En chargement</div>
        </motion.div>

        {/* Map Controls */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <button
            onClick={() => handleInteraction("Zoom (+)", "Agrandissement de la carte...")}
            className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg font-bold text-lg hover:text-btp-cta active:scale-90 transition-all"
          >+</button>
          <button
            onClick={() => handleInteraction("Zoom (-)", "Réduction de la carte...")}
            className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg font-bold text-lg hover:text-btp-cta active:scale-90 transition-all"
          >-</button>
        </div>

        <div className="absolute bottom-6 left-6 p-4 bg-white/80 backdrop-blur-md rounded-2xl border border-white/50 shadow-2xl max-w-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-orange-100 text-btp-cta rounded-xl flex items-center justify-center">
              <ShieldAlert size={20} />
            </div>
            <div>
              <p className="text-[10px] font-black text-btp-cta uppercase tracking-widest">Alerte Géorepérage</p>
              <p className="text-xs font-bold text-slate-900">Sortie de zone non autorisée</p>
            </div>
          </div>
          <p className="text-[11px] text-btp-secondary font-medium">Le véhicule <span className="font-bold text-slate-900 underline">TR-508</span> a quitté le périmètre du chantier Anyama à 16:15.</p>
        </div>
      </div>
    </div>
  </div>
);

const HrView = () => (
  <div className="max-w-5xl mx-auto">
    <header className="mb-10 flex justify-between items-end">
      <div>
        <h1 className="text-4xl font-heading font-bold tracking-tight">Ressources Humaines</h1>
        <p className="text-btp-secondary font-medium mt-1">Gérez vos équipes, le pointage et la paie sur tous les chantiers.</p>
      </div>
      <div className="flex gap-4">
        <div className="text-right">
          <p className="text-[10px] text-btp-secondary font-black uppercase tracking-widest">Effectif Total</p>
          <p className="text-2xl font-bold">542</p>
        </div>
        <div className="w-px h-10 bg-slate-200"></div>
        <div className="text-right text-green-600">
          <p className="text-[10px] font-black uppercase tracking-widest opacity-70">Présents</p>
          <p className="text-2xl font-bold">482</p>
        </div>
      </div>
    </header>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => handleInteraction("Équipes", "Ouverture de la vue détaillée des 14 équipes...")}
        className="glass-card flex items-center gap-4 cursor-pointer"
      >
        <div className="w-12 h-12 rounded-xl bg-orange-100 text-btp-cta flex items-center justify-center">
          <Users size={24} />
        </div>
        <div>
          <p className="text-2xl font-bold">14</p>
          <p className="text-[10px] text-btp-secondary font-bold uppercase">Équipes Actives</p>
        </div>
      </motion.div>
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => handleInteraction("Présence", "Consultation du journal de présence mensuel...")}
        className="glass-card flex items-center gap-4 cursor-pointer"
      >
        <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
          <Calendar size={24} />
        </div>
        <div>
          <p className="text-2xl font-bold">92%</p>
          <p className="text-[10px] text-btp-secondary font-bold uppercase">Taux de Présence</p>
        </div>
      </motion.div>
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => handleInteraction("Recrutement", "Accès aux 8 fiches de poste ouvertes...")}
        className="glass-card flex items-center gap-4 cursor-pointer"
      >
        <div className="w-12 h-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center">
          <Plus size={24} />
        </div>
        <div>
          <p className="text-2xl font-bold">8</p>
          <p className="text-[10px] text-btp-secondary font-bold uppercase">Recrutements en cours</p>
        </div>
      </motion.div>
    </div>

    <div className="glass-card p-0 overflow-hidden border-slate-200">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <h3 className="font-bold font-heading">Journal de Pointage (Live)</h3>
        <div className="flex gap-2">
          <button
            onClick={() => handleInteraction("Export PDF", "Génération du rapport de pointage...")}
            className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold hover:border-btp-cta hover:text-btp-cta active:scale-95 transition-all"
          >Exporter PDF</button>
          <button
            onClick={() => handleInteraction("Rapport", "Compilation des données hebdomadaires...")}
            className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold active:scale-95 transition-all"
          >Rapport Hebdomadaire</button>
        </div>
      </div>
      <table className="w-full text-left">
        <thead>
          <tr className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
            <th className="px-6 py-4">Employé</th>
            <th className="px-6 py-4">Chantier</th>
            <th className="px-6 py-4">Heure Arrivée</th>
            <th className="px-6 py-4">Statut</th>
            <th className="px-6 py-4">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {[
            { name: "Koffi N'Goran", role: "Chef de Chantier", site: "Cocody Plateau", time: "07:15", status: "ok" },
            { name: "Mariatou Koné", role: "Ingénieure Génie Civil", site: "Pont Bassam", time: "07:42", status: "ok" },
            { name: "Moussa Traoré", role: "Conducteur d'Engin", site: "Barrage Buyo", time: "08:05", status: "late" },
            { name: "Jean-Luc Gnahoré", role: "Maçon Spécialisé", site: "Anyama", time: "07:22", status: "ok" },
            { name: "Awa Sidibé", role: "HSE Manager", site: "Port Abidjan", time: "07:55", status: "ok" }
          ].map((e, i) => (
            <tr
              key={i}
              onClick={() => handleInteraction(`Employé : ${e.name}`, `Vue détaillée du profil (${e.role})`)}
              className="group hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-200 flex-shrink-0"></div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">{e.name}</p>
                    <p className="text-[10px] text-btp-secondary font-medium">{e.role}</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-xs font-medium text-slate-600">{e.site}</td>
              <td className="px-6 py-4 text-xs font-bold text-slate-900">{e.time}</td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 rounded text-[10px] font-black uppercase ${e.status === 'ok' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {e.status === 'ok' ? 'Présent' : 'Retard'}
                </span>
              </td>
              <td className="px-6 py-4">
                <button className="p-2 hover:bg-white rounded-lg text-slate-400 hover:text-btp-cta transition-colors">
                  <Settings size={14} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const CustomsView = () => (
  <div className="max-w-6xl mx-auto">
    <header className="mb-10 flex justify-between items-center">
      <div>
        <h1 className="text-4xl font-heading font-bold tracking-tight">Port d'Abidjan</h1>
        <p className="text-btp-secondary font-medium mt-1">Suivi des importations de matériaux et dédouanement.</p>
      </div>
      <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center">
        <Ship size={32} />
      </div>
    </header>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
      <div className="glass-card bg-blue-600 text-white border-0 shadow-blue-100">
        <p className="text-[10px] font-black uppercase tracking-widest opacity-70 mb-1">En Transit Maritime</p>
        <p className="text-4xl font-bold font-heading">12</p>
        <p className="mt-4 text-[11px] leading-relaxed opacity-80 font-medium">Containers en provenance de Chine et d'Europe.</p>
      </div>
      <div className="glass-card">
        <p className="text-[10px] text-btp-secondary font-black uppercase tracking-widest mb-1">Dédouanement en Cours</p>
        <p className="text-4xl font-bold font-heading text-orange-500">8</p>
        <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-slate-500">
          <span className="w-2 h-2 bg-orange-500 rounded-full"></span> 3 dossiers bloqués (Documents manquants)
        </div>
      </div>
      <div className="glass-card">
        <p className="text-[10px] text-btp-secondary font-black uppercase tracking-widest mb-1">Prêt pour Enlèvement</p>
        <p className="text-4xl font-bold font-heading text-green-500">4</p>
        <button className="mt-4 w-full py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-black transition-colors">
          Organiser le transport
        </button>
      </div>
    </div>

    <div className="glass-card">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-heading font-bold italic">Suivi des Cargaisons</h3>
        <div className="flex items-center gap-2">
          <div className="flex -space-x-3">
            <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] font-bold">MSC</div>
            <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-800 text-white flex items-center justify-center text-[10px] font-bold">CMA</div>
          </div>
          <span className="text-[10px] font-bold text-slate-400">Partenaires Logistiques</span>
        </div>
      </div>

      <div className="space-y-4">
        {[
          { id: "CONT-8829-CI", item: "Structure Acier Inox", from: "Ningbo, CN", arrival: "14/03/26", status: "transit" },
          { id: "CONT-4410-CI", item: "Générateurs Cat 500kVA", from: "Antwerp, BE", arrival: "10/03/26", status: "customs" },
          { id: "CONT-2115-CI", item: "Revêtement Façade", from: "Valencia, ES", arrival: "18/03/26", status: "transit" },
          { id: "CONT-9932-CI", item: "Ciment spécial VRD", from: "Dakar, SN", arrival: "09/03/26", status: "clear" }
        ].map((c, i) => (
          <motion.div
            key={i}
            whileHover={{ x: 5, backgroundColor: 'rgba(59, 130, 246, 0.05)' }}
            whileTap={{ scale: 0.99 }}
            onClick={() => handleInteraction(`Container : ${c.id}`, `Article : ${c.item} | Origine : ${c.from}`)}
            className="flex items-center p-4 rounded-2xl border border-slate-100 hover:border-blue-200 transition-all group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
              <Ship size={20} />
            </div>
            <div className="ml-4 flex-1">
              <div className="flex items-center gap-2 mb-0.5">
                <p className="font-bold text-slate-900">{c.item}</p>
                <span className="text-[10px] font-black text-slate-400">{c.id}</span>
              </div>
              <p className="text-[11px] text-btp-secondary font-medium">Origine : {c.from} • Arrivée prévue : {c.arrival}</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${c.status === 'transit' ? 'bg-slate-100 text-slate-600' :
                  c.status === 'customs' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'
                  }`}>
                  {c.status === 'transit' ? 'En Mer' : c.status === 'customs' ? 'Douane' : 'Dédouané'}
                </span>
              </div>
              <ChevronRight size={18} className="text-slate-300 group-hover:text-blue-600" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

const FinanceView = () => (
  <div className="max-w-6xl mx-auto">
    <header className="mb-10 flex justify-between items-center">
      <div>
        <h1 className="text-4xl font-heading font-bold tracking-tight">Comptabilité CFA</h1>
        <p className="text-btp-secondary font-medium mt-1">Suivi budgétaire, trésorerie et obligations fiscales.</p>
      </div>
      <div className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-2xl shadow-sm">
        <Droplets size={18} className="text-btp-cta" />
        <span className="text-sm font-bold">Liquidités : <span className="text-btp-cta">158.4M CFA</span></span>
      </div>
    </header>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
      <StatCard title="Budget Global" value="4.2B CFA" icon={Wallet} color="#64748B" />
      <StatCard title="Total Dépenses" value="2.8B CFA" icon={BarChart3} color="#F97316" trend={15} />
      <StatCard title="Créances Clients" value="640M CFA" icon={Plus} color="#10B981" />
    </div>

    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
      <div className="glass-card">
        <h3 className="text-xl font-heading font-bold mb-6 italic">Flux de Trésorerie</h3>
        <div className="h-64 bg-slate-50 rounded-2xl flex items-end justify-between p-6 relative group overflow-hidden border border-slate-100">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-200/20 to-transparent"></div>
          {[40, 60, 45, 90, 75, 55, 80].map((h, i) => (
            <div key={i} className="w-8 bg-btp-primary rounded-t-lg relative z-10 transition-all hover:bg-btp-cta" style={{ height: `${h}%` }}>
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">{h * 10}M</div>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-4 px-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
          <span>Jan</span><span>Fev</span><span>Mar</span><span>Avr</span><span>Mai</span><span>Juin</span><span>Juil</span>
        </div>
      </div>

      <div className="glass-card flex flex-col">
        <h3 className="text-xl font-heading font-bold mb-6 italic">Alertes Fiscales & Paiements</h3>
        <div className="flex-1 space-y-4">
          <div className="p-4 rounded-xl bg-red-50 border border-red-100 flex items-start gap-3">
            <ShieldAlert size={20} className="text-red-500 shrink-0" />
            <div>
              <p className="text-xs font-bold text-red-700 uppercase tracking-wider">TVA Février 2026</p>
              <p className="text-[11px] text-red-600 font-medium mt-1">Échéance dans 2 jours (12 Mars). Montant : 42.5M CFA.</p>
            </div>
          </div>
          <div
            onClick={() => handleInteraction("Audit Interne", "Consultation de l'ordre de mission pour Yamoussoukro...")}
            className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3 cursor-pointer hover:bg-white transition-colors active:scale-95"
          >
            <Settings size={20} className="text-slate-400 shrink-0" />
            <div>
              <p className="text-xs font-bold text-slate-800 uppercase tracking-wider">Audit Interne</p>
              <p className="text-[11px] text-btp-secondary font-medium mt-1">Prévu pour le Chantier de Yamoussoukro le 20 Mars.</p>
            </div>
          </div>
          <button
            onClick={() => handleInteraction("Facturation", "Ouverture du module de gestion des factures CFA...")}
            className="mt-auto w-full btn-primary py-4 rounded-2xl shadow-lg shadow-orange-100 font-black tracking-[0.1em] text-xs active:scale-95 transition-transform"
          >
            GÉRER LES FACTURES
          </button>
        </div>
      </div>
    </div>
  </div>
);



const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedProject, setSelectedProject] = useState(null);

  const renderContent = () => {
    if (selectedProject && activeTab === 'projects') {
      return <ProjectDetailView project={selectedProject} onBack={() => setSelectedProject(null)} />;
    }

    switch (activeTab) {
      case 'dashboard': return <DashboardView />;
      case 'projects': return <ProjectsView onSelectProject={(p) => setSelectedProject(p)} />;
      case 'gps': return <GpsView />;
      case 'hr': return <HrView />;
      case 'customs': return <CustomsView />;
      case 'finance': return <FinanceView />;
      case 'chat': return <ChatView />;
      case 'actions': return <ActionsView />;
      default: return <DashboardView />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 font-body text-btp-text selection:bg-btp-cta/20">
      <Toaster richColors position="bottom-right" closeButton />
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-slate-200 p-6 flex flex-col h-full overflow-y-auto shrink-0 scrollbar-hide">
        <div className="flex items-center gap-3 mb-10 px-2 shrink-0">
          <div className="w-10 h-10 bg-gradient-to-br from-btp-cta to-orange-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-orange-100 rotate-3">
            <HardHat size={24} />
          </div>
          <div>
            <h2 className="text-xl font-heading font-black tracking-tight leading-none">BTP-IVOIRE</h2>
            <span className="text-[10px] text-btp-secondary font-bold uppercase tracking-[0.2em]">Manager Pro</span>
          </div>
        </div>

        <nav className="flex flex-col gap-1 mb-8 shrink-0">
          <SidebarItem id="dashboard" icon={LayoutDashboard} label="Tableau de Bord" activeTab={activeTab} setActiveTab={setActiveTab} />
          <SidebarItem id="projects" icon={BarChart3} label="Chantiers" activeTab={activeTab} setActiveTab={setActiveTab} />
          <SidebarItem id="chat" icon={MessageSquare} label="Conversations" activeTab={activeTab} setActiveTab={setActiveTab} />
          <SidebarItem id="actions" icon={CheckSquare} label="Actions en Attente" activeTab={activeTab} setActiveTab={setActiveTab} />
          <SidebarItem id="gps" icon={MapPin} label="Suivi GPS Live" activeTab={activeTab} setActiveTab={setActiveTab} />
          <SidebarItem id="hr" icon={Users} label="Ressources Humaines" activeTab={activeTab} setActiveTab={setActiveTab} />
          <SidebarItem id="customs" icon={Ship} label="Port d'Abidjan" activeTab={activeTab} setActiveTab={setActiveTab} />
          <SidebarItem id="finance" icon={Wallet} label="Comptabilité CFA" activeTab={activeTab} setActiveTab={setActiveTab} />
        </nav>

        <div className="mt-auto shrink-0">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleInteraction("Météo AI", "Analyse des prévisions saisonnières pour la Côte d'Ivoire...")}
            className="p-4 rounded-2xl bg-gradient-to-br from-[#1e293b] to-slate-800 text-white relative overflow-hidden cursor-pointer shadow-xl"
          >
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <CloudRain className="text-btp-cta" size={18} />
                <span className="text-[10px] font-bold uppercase tracking-wider text-btp-cta">Alerte Météo AI</span>
              </div>
              <p className="text-[11px] leading-relaxed opacity-90 font-medium">
                Saison des pluies prévue le <span className="text-btp-cta font-black">15 Mai</span>.
                Optimisez vos coulages de béton à Yamoussoukro cette semaine.
              </p>
            </div>
            <div className="absolute -right-4 -bottom-4 opacity-10">
              <CloudRain size={80} />
            </div>
          </motion.div>

          <div className="mt-6 flex items-center gap-3 px-2 border-t border-slate-100 pt-6">
            <div
              onClick={() => handleInteraction("Profil Utilisateur", "Accès aux paramètres de Jean-Marc Koné...")}
              className="w-8 h-8 rounded-full bg-slate-200 border-2 border-btp-cta flex-shrink-0 cursor-pointer active:scale-90 transition-transform"
            ></div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-bold truncate tracking-tight text-slate-900">M. Jean-Marc Koné</p>
              <p className="text-[10px] text-btp-secondary font-medium">Directeur Technique</p>
            </div>
            <Settings
              size={16}
              onClick={() => handleInteraction("Paramètres", "Configuration de l'interface et du compte...")}
              className="text-slate-400 hover:text-btp-cta cursor-pointer transition-colors active:rotate-90"
            />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-y-auto scroll-smooth">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default App;
