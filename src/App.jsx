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
      ? 'bg-black text-white shadow-xl shadow-slate-200'
      : 'text-slate-500 hover:bg-slate-50 hover:text-black'
      }`}
  >
    <Icon size={20} className={activeTab === id ? 'text-white' : 'group-hover:text-black transition-colors'} />
    <span className="font-semibold text-sm">{label}</span>
    {activeTab === id && (
      <motion.div
        layoutId="sidebar-active"
        className="absolute left-0 w-1.5 h-6 bg-white rounded-r-full"
      />
    )}
  </button>
);

const DashboardView = ({ setActiveTab }) => (
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

      {/* Actions en Attente Sidebar */}
      <div className="flex flex-col gap-6">
        <div className="glass-card bg-slate-900 text-white border-0 shadow-2xl shadow-slate-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-btp-cta/20 rounded-lg">
              <CheckSquare size={20} className="text-btp-cta" />
            </div>
            <div>
              <h3 className="text-white text-lg font-heading font-bold !text-white">Actions en Attente</h3>
              <p className="text-[10px] text-btp-cta font-bold uppercase tracking-widest font-heading">Priorité Immédiate</p>
            </div>
          </div>

          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab('actions')}
              className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-white/30 transition-colors cursor-pointer group"
            >
              <div className="flex justify-between items-start mb-2">
                <p className="font-bold text-[10px] text-red-400 uppercase tracking-widest">Urgent : Grue G1</p>
                <span className="px-2 py-0.5 bg-red-400/10 text-red-400 rounded text-[9px] font-black uppercase">En attente</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed font-medium">Contrôle technique requis sur le Pont Cocody.</p>
              <div className="mt-4 flex items-center gap-2 pt-3 border-t border-slate-700/50">
                <div className="w-5 h-5 rounded-full bg-slate-600 flex items-center justify-center text-[8px] font-bold">JK</div>
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Par Jean-Marc Koné</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab('actions')}
              className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-white/30 transition-colors cursor-pointer"
            >
              <div className="flex justify-between items-start mb-2">
                <p className="font-bold text-[10px] text-orange-400 uppercase tracking-widest">Validation Facture</p>
                <span className="px-2 py-0.5 bg-orange-400/10 text-orange-400 rounded text-[9px] font-black uppercase">À signer</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed font-medium">Paiement Holcim (12.4M) pour Bassam.</p>
              <div className="mt-4 flex items-center gap-2 pt-3 border-t border-slate-700/50">
                <div className="w-5 h-5 rounded-full bg-slate-600 flex items-center justify-center text-[8px] font-bold">AK</div>
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Par Alice Kouassi</p>
              </div>
            </motion.div>
          </div>

          <button
            onClick={() => setActiveTab('actions')}
            className="mt-8 w-full py-3 bg-white text-slate-900 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-black hover:text-white transition-all active:scale-95"
          >
            VOIR TOUTES LES ACTIONS
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
              className="absolute top-1/4 left-1/3 w-4 h-4 bg-btp-cta rounded-full border-2 border-white shadow-lg cursor-pointer z-0"
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
              className="absolute top-1/2 left-1/2 w-4 h-4 bg-btp-cta rounded-full border-2 border-white shadow-lg cursor-pointer z-0"
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2, delay: 1 }}
              className="absolute bottom-1/3 right-1/4 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-lg cursor-pointer z-0"
            />

            <div className="absolute bottom-4 left-4 right-4 p-3 bg-white/90 backdrop-blur rounded-lg border border-slate-200 shadow-sm cursor-pointer hover:bg-white transition-colors active:scale-95">
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
          <div className="glass-card bg-slate-900 border-0 shadow-2xl overflow-hidden relative group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform">
              <Wallet size={64} className="text-white" />
            </div>
            <h3 className="font-heading font-bold mb-6 text-white text-xl relative z-10">Statut Financier</h3>
            <div className="space-y-6 relative z-10">
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase mb-2 tracking-widest">Budget Total</p>
                <p className="text-3xl font-black text-white">{project.budget} CFA</p>
              </div>
              <div>
                <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-2 uppercase tracking-wider">
                  <span>Avancement</span>
                  <span className="text-btp-cta">65%</span>
                </div>
                <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '65%' }}
                    className="h-full bg-gradient-to-r from-btp-cta to-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.4)]"
                  />
                </div>
                <div className="flex justify-between mt-3 text-[10px] font-bold">
                  <span className="text-btp-secondary">Dépensé : 65%</span>
                  <span className="text-green-400">Restant : 35%</span>
                </div>
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
    { name: "Canal Général", lastMsg: "Attention aux orages sur San Pedro...", status: "available", avatar: null, unread: 2, type: "site" },
    { name: "Direction Technique", lastMsg: "Le planning a été mis à jour.", status: "dnd", avatar: "JK", info: "Jean-Marc Koné", type: "office" },
    { name: "Chantier Bassam", lastMsg: "Béton livré à 14:00.", status: "available", avatar: "MD", info: "Moussa Diakité", type: "site" },
    { name: "Equipe RH", lastMsg: "Fiches de paie prêtes.", status: "away", avatar: "RH", type: "office" }
  ];

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col">
      <header className="mb-8 flex justify-between items-end">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Système de Communication Chiffré</span>
          </div>
          <h1 className="text-4xl font-heading font-black tracking-tight text-slate-900 flex items-center gap-4">
            Kayry Connect
            <span className="text-xs bg-btp-cta/10 text-btp-cta px-3 py-1 rounded-full font-bold">PRO</span>
          </h1>
        </div>
        <div className="flex gap-3">
          <button className="p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-sm">
            <Settings size={18} className="text-slate-400" />
          </button>
          <button className="btn-primary flex items-center gap-2">
            <Plus size={18} /> Nouvelle Discussion
          </button>
        </div>
      </header>

      <div className="flex-1 bg-white rounded-[2rem] shadow-2xl shadow-slate-200 border border-slate-100 overflow-hidden flex">
        {/* Sidebar */}
        <div className="w-80 border-r border-slate-100 flex flex-col bg-slate-50/50">
          <div className="p-6">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-btp-cta transition-colors" size={16} />
              <input
                type="text"
                placeholder="Rechercher une équipe..."
                className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-btp-cta/10 focus:border-btp-cta transition-all"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-3 space-y-1">
            {conversations.map((c, i) => (
              <motion.div
                key={i}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveConversation(i)}
                className={`p-4 rounded-2xl cursor-pointer transition-all flex items-center gap-4 ${activeConversation === i
                    ? 'bg-white shadow-lg shadow-slate-200 border border-slate-100'
                    : 'hover:bg-white/60 text-slate-500 hover:text-slate-900 border border-transparent'
                  }`}
              >
                <div className="relative">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-white shadow-inner ${c.type === 'site' ? 'bg-btp-primary' : 'bg-slate-700'
                    }`}>
                    {c.avatar || c.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white shadow-sm ${c.status === 'available' ? 'bg-green-500' : c.status === 'dnd' ? 'bg-red-500' : 'bg-amber-500'
                    }`}></div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-0.5">
                    <h3 className="font-bold text-sm truncate">{c.name}</h3>
                    {c.unread > 0 && (
                      <span className="w-2 h-2 bg-btp-cta rounded-full shadow-lg shadow-orange-500"></span>
                    )}
                  </div>
                  <p className="text-xs opacity-70 truncate font-medium">{c.lastMsg}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-white">
          <div className="p-5 border-b border-slate-50 flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-20">
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white shadow-lg ${conversations[activeConversation].type === 'site' ? 'bg-btp-primary' : 'bg-slate-700'
                }`}>
                {conversations[activeConversation].avatar || conversations[activeConversation].name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h3 className="font-bold text-slate-900">{conversations[activeConversation].name}</h3>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${conversations[activeConversation].status === 'available' ? 'bg-green-500' : 'bg-amber-500'}`}></span>
                  {conversations[activeConversation].status === 'available' ? 'Équipe Connectée' : 'Partiellement Absent'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2.5 rounded-xl hover:bg-slate-50 text-slate-400 hover:text-btp-cta transition-all border border-transparent hover:border-slate-100">
                <Users size={18} />
              </button>
              <button className="p-2.5 rounded-xl hover:bg-slate-50 text-slate-400 hover:text-btp-cta transition-all border border-transparent hover:border-slate-100">
                <FileText size={18} />
              </button>
              <div className="w-px h-6 bg-slate-100 mx-2"></div>
              <button className="btn-primary py-2 px-4 text-xs">Ouvrir Dossier Technique</button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-fixed opacity-95">
            <div className="flex justify-center">
              <span className="px-4 py-1.5 bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-widest rounded-full border border-slate-200 shadow-sm">
                Aujourd'hui, 10 Mars 2026
              </span>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-orange-100 text-btp-cta flex items-center justify-center font-bold text-xs shrink-0 shadow-sm">JK</div>
              <div className="max-w-[70%]">
                <div className="bg-slate-50 p-4 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm">
                  <p className="text-sm font-bold text-slate-900 mb-1">Jean-Marc Koné</p>
                  <p className="text-sm text-slate-600 leading-relaxed font-medium">
                    Bonjour à tous, point météo : attention aux orages sur San Pedro cet après-midi. Sécurisez le matériel sensible.
                  </p>
                </div>
                <span className="text-[10px] text-slate-400 font-bold ml-2 mt-1 block">08:30 • Lu</span>
              </div>
            </div>

            <div className="flex flex-row-reverse items-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-slate-800 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-lg">ME</div>
              <div className="max-w-[70%] flex flex-col items-end">
                <div className="bg-btp-primary p-4 rounded-2xl rounded-tr-none shadow-xl shadow-orange-100 text-white">
                  <p className="text-sm leading-relaxed font-medium">
                    Bien reçu Directeur. L'équipe Alpha a déjà commencé le repli. Le béton de la dalle B2 est sec.
                  </p>
                </div>
                <span className="text-[10px] text-slate-400 font-bold mr-2 mt-1 block">09:15 • Envoyé</span>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-btp-primary text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-sm">AK</div>
              <div className="max-w-[70%]">
                <div className="bg-slate-50 p-4 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm">
                  <p className="text-sm font-bold text-slate-900 mb-2">Alice Kouassi</p>
                  <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center gap-3 cursor-pointer hover:border-btp-cta transition-colors group">
                    <div className="p-2 bg-btp-cta/10 text-btp-cta rounded-lg group-hover:bg-btp-cta group-hover:text-white transition-colors">
                      <FileText size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800 uppercase">Rapport_San_Pedro.pdf</p>
                      <p className="text-[10px] text-slate-400 font-bold">2.4 MB • PDF Document</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 mt-3 leading-relaxed font-medium">
                    Ci-joint le rapport technique mis à jour avant les intempéries.
                  </p>
                </div>
                <span className="text-[10px] text-slate-400 font-bold ml-2 mt-1 block">10:05 • Lu</span>
              </div>
            </div>
          </div>

          <div className="p-6 bg-white border-t border-slate-50">
            <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-[1.5rem] border border-slate-200 focus-within:border-btp-cta/50 focus-within:ring-4 focus-within:ring-btp-cta/5 transition-all shadow-inner">
              <button className="p-3 text-slate-400 hover:text-btp-cta transition-colors">
                <Plus size={20} />
              </button>
              <input
                type="text"
                value={msgInputValue}
                onChange={(e) => setMsgInputValue(e.target.value)}
                placeholder="Tapez un message pour l'équipe..."
                className="flex-1 bg-transparent border-0 focus:ring-0 text-sm font-medium py-3"
              />
              <button className="btn-primary w-12 h-12 !p-0 flex items-center justify-center rounded-2xl shadow-lg shadow-orange-200 active:scale-90 transition-transform">
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ActionsView = () => {
  const [completedActions, setCompletedActions] = useState([]);
  const [filter, setFilter] = useState('all');

  const actions = [
    { id: 1, title: "Valider facture Ciment Holcim", project: "Echangeur Akwaba", priority: "high", date: "Demain", status: "En attente", addedBy: "Jean-Marc Koné", initials: "JK", info: "Paiement de 12.4M CFA pour le secteur Nord." },
    { id: 2, title: "Rapport HSE mensuel", project: "CHU Yamoussoukro", priority: "medium", date: "12 Mars", status: "À signer", addedBy: "Alice Kouassi", initials: "AK", info: "Vérifier les protocoles de sécurité du R+4." },
    { id: 3, title: "Approuver devis climatisation", project: "Logements Anyama", priority: "low", date: "15 Mars", status: "En révision", addedBy: "Moussa Diakité", initials: "MD", info: "Consultation de 3 fournisseurs locaux." },
    { id: 4, title: "Contrôle technique grue G1", project: "Pont Cocody", priority: "high", date: "Aujourd'hui", status: "Urgent", addedBy: "Koffi N'Goran", initials: "KN", info: "Risque de retard sur le coulage principal." },
    { id: 5, title: "Vérifier planning béton", project: "Barrage Buyo", priority: "medium", date: "13 Mars", status: "En attente", addedBy: "Karim Ouattara", initials: "KO", info: "Coordination avec l'usine de Soubré." },
    { id: 6, title: "Commander ferraillage R+2", project: "Stade San Pedro", priority: "low", date: "16 Mars", status: "À valider", addedBy: "Awa Sidibé", initials: "AS", info: "Quantités estimées : 45 tonnes." }
  ];

  const handleComplete = (id, title) => {
    setCompletedActions(prev => [...prev, id]);
    handleInteraction(`✓ ${title}`, "Action marquée comme terminée.");
  };

  const getPriorityStyles = (priority) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-50/20';
      case 'medium': return 'border-l-orange-500 bg-orange-50/20';
      default: return 'border-l-emerald-500 bg-emerald-50/20';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <header className="flex justify-between items-end">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-btp-cta rounded-full animate-ping"></div>
            <span className="text-[10px] text-btp-secondary font-black uppercase tracking-[0.3em]">Module de Gestion Opérationnelle</span>
          </div>
          <h1 className="text-4xl font-heading font-black tracking-tight text-slate-900">Actions & Validations</h1>
          <p className="text-slate-500 text-sm font-medium">Supervisez et validez les étapes critiques de vos chantiers en un clic.</p>
        </div>
        <div className="flex bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm">
          {['all', 'high', 'low'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filter === f ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'
                }`}
            >
              {f === 'all' ? 'Toutes' : f === 'high' ? 'Urgentes' : 'Secondaires'}
            </button>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {actions.map((action, i) => {
          const isCompleted = completedActions.includes(action.id);
          const priorityColor = action.priority === 'high' ? 'text-red-500' : action.priority === 'medium' ? 'text-orange-500' : 'text-emerald-500';

          return (
            <motion.div
              key={action.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: isCompleted ? 0.5 : 1, scale: 1 }}
              whileHover={{ y: -8, shadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
              className={`glass-card p-0 overflow-hidden border-0 bg-white ring-1 ring-slate-100 flex flex-col h-full ${isCompleted ? 'grayscale pointer-events-none' : ''}`}
            >
              <div className={`h-1.5 w-full ${action.priority === 'high' ? 'bg-red-500' : action.priority === 'medium' ? 'bg-orange-500' : 'bg-emerald-500'}`}></div>

              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider ${action.priority === 'high' ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-500'
                    }`}>
                    {action.priority === 'high' ? 'Priorité Haute' : 'Standard'}
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{action.date}</span>
                </div>

                <h3 className="text-lg font-heading font-bold text-slate-900 mb-2 leading-tight">{action.title}</h3>
                <p className="text-xs text-slate-500 font-medium mb-4">{action.info}</p>

                <div className="mt-auto space-y-4 pt-4 border-t border-slate-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-btp-primary/10 text-btp-primary flex items-center justify-center font-bold text-[10px]">
                        {action.initials}
                      </div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{action.addedBy}</span>
                    </div>
                    <span className="text-[10px] text-btp-cta font-black uppercase tracking-[0.2em]">{action.project}</span>
                  </div>

                  <button
                    onClick={() => handleComplete(action.id, action.title)}
                    className={`w-full py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${isCompleted
                        ? 'bg-green-500 text-white cursor-default'
                        : 'bg-slate-900 text-white hover:bg-btp-cta hover:shadow-xl hover:shadow-orange-100 active:scale-95'
                      }`}
                  >
                    {isCompleted ? '✓ Dossier Clos' : 'Valider maintenant'}
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="pt-10 flex justify-center">
        <button className="flex items-center gap-2 px-8 py-3 bg-white border border-slate-200 rounded-full text-slate-400 font-bold text-xs hover:text-btp-cta hover:border-btp-cta transition-all group">
          <Plus size={16} className="group-hover:rotate-90 transition-transform" />
          Charger l'Historique des Actions
        </button>
      </div>
    </div>
  );
};

const GpsView = () => {
  const [selectedSite, setSelectedSite] = useState(null);

  // Chantiers avec positions approximatives sur la carte CIV (en % de la carte)
  const chantiers = [
    { id: 1, name: "Autoroute Abidjan-Bassam", city: "Grand-Bassam", progress: 75, status: "active", chef: "K. Kouadio", equipes: 4, engins: 12, x: 72, y: 78 },
    { id: 2, name: "Pont Cocody-Plateau", city: "Abidjan", progress: 45, status: "warning", chef: "M. Diakité", equipes: 3, engins: 8, x: 68, y: 76 },
    { id: 3, name: "Barrage Buyo (Extension)", city: "Buyo", progress: 20, status: "error", chef: "S. Traoré", equipes: 2, engins: 15, x: 38, y: 62 },
    { id: 4, name: "Logements Sociaux Anyama", city: "Anyama", progress: 90, status: "active", chef: "P. Yao", equipes: 5, engins: 6, x: 66, y: 73 },
    { id: 5, name: "Échangeur Akwaba", city: "Abidjan-Plateau", progress: 62, status: "active", chef: "A. Diallo", equipes: 6, engins: 18, x: 70, y: 77 },
    { id: 6, name: "Stade San Pedro", city: "San Pedro", progress: 98, status: "active", chef: "J. Koné", equipes: 3, engins: 5, x: 35, y: 82 },
    { id: 7, name: "Centrale Solaire", city: "Boundiali", progress: 15, status: "active", chef: "K. Ouattara", equipes: 2, engins: 4, x: 42, y: 22 },
    { id: 8, name: "CHU de Yamoussoukro", city: "Yamoussoukro", progress: 40, status: "error", chef: "A. Kouassi", equipes: 4, engins: 10, x: 52, y: 58 },
    { id: 9, name: "Pont Tiassalé", city: "Tiassalé", progress: 100, status: "active", chef: "M. Bakayoko", equipes: 1, engins: 2, x: 58, y: 68 },
    { id: 10, name: "Port Sec de Bouaké", city: "Bouaké", progress: 30, status: "warning", chef: "I. Touré", equipes: 3, engins: 9, x: 55, y: 45 },
    { id: 11, name: "Barrage de Soubré 2", city: "Soubré", progress: 35, status: "active", chef: "D. Bamba", equipes: 5, engins: 20, x: 36, y: 70 },
    { id: 12, name: "Route Korhogo-Ferkessédougou", city: "Korhogo", progress: 55, status: "active", chef: "Y. Coulibaly", equipes: 4, engins: 14, x: 48, y: 18 },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return { bg: 'bg-green-500', ring: 'ring-green-400/30', text: 'text-green-600', label: 'En cours' };
      case 'warning': return { bg: 'bg-orange-500', ring: 'ring-orange-400/30', text: 'text-orange-600', label: 'Retard' };
      case 'error': return { bg: 'bg-red-500', ring: 'ring-red-400/30', text: 'text-red-600', label: 'Urgent' };
      default: return { bg: 'bg-slate-500', ring: 'ring-slate-400/30', text: 'text-slate-600', label: 'Inconnu' };
    }
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col gap-6">
      <header className="flex justify-between items-center">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.6)]"></div>
            <span className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em]">Cartographie Nationale des Chantiers</span>
          </div>
          <h1 className="text-4xl font-heading font-black tracking-tight text-slate-900">Carte de la Côte d'Ivoire</h1>
          <p className="text-slate-500 text-sm font-medium">Tous vos chantiers répertoriés en temps réel sur le territoire national.</p>
        </div>
        <div className="flex gap-3 items-center">
          <div className="flex items-center gap-4 px-5 py-3 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-green-500"></span>
              <span className="text-[10px] font-bold text-slate-500 uppercase">{chantiers.filter(c => c.status === 'active').length} Actifs</span>
            </div>
            <div className="w-px h-4 bg-slate-200"></div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-orange-500"></span>
              <span className="text-[10px] font-bold text-slate-500 uppercase">{chantiers.filter(c => c.status === 'warning').length} Retard</span>
            </div>
            <div className="w-px h-4 bg-slate-200"></div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500"></span>
              <span className="text-[10px] font-bold text-slate-500 uppercase">{chantiers.filter(c => c.status === 'error').length} Urgents</span>
            </div>
          </div>
          <span className="text-xs font-black bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-lg">{chantiers.length} Chantiers</span>
        </div>
      </header>

      <div className="flex-1 flex gap-6 min-h-0">
        {/* Sites List */}
        <div className="w-80 flex flex-col gap-3 overflow-y-auto pr-2 scrollbar-hide">
          {chantiers.map((c) => {
            const sc = getStatusColor(c.status);
            return (
              <motion.div
                key={c.id}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedSite(c)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${selectedSite?.id === c.id ? 'bg-white shadow-xl border-btp-cta/40 ring-2 ring-btp-cta/10' : 'bg-white/60 border-slate-100 hover:bg-white hover:border-slate-200'
                  }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm text-slate-900 truncate leading-tight">{c.name}</h4>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5 flex items-center gap-1"><MapPin size={10} /> {c.city}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase ${sc.text} ${sc.bg.replace('bg-', 'bg-')}/10`}>{sc.label}</span>
                </div>
                <div className="mb-2">
                  <div className="flex justify-between text-[10px] font-bold mb-1">
                    <span className="text-slate-400">Progression</span>
                    <span className="text-slate-700">{c.progress}%</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${c.progress === 100 ? 'bg-green-500' : 'bg-btp-cta'}`} style={{ width: `${c.progress}%` }}></div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-400 font-semibold">
                  <span>{c.equipes} équipes</span>
                  <span>{c.engins} engins</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Map of Côte d'Ivoire */}
        <div className="flex-1 bg-[#1a2332] rounded-[2.5rem] relative shadow-2xl border border-slate-700/50 overflow-hidden">
          {/* Subtle grid */}
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

          {/* SVG Map of Côte d'Ivoire */}
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full p-8 pointer-events-none" preserveAspectRatio="xMidYMid meet">
            {/* Country outline - simplified shape of CIV */}
            <path d="
              M 42,5 L 48,4 L 55,5 L 58,8 L 62,7 L 65,10 L 68,9 L 72,12 L 75,11
              L 78,14 L 76,18 L 78,22 L 75,26 L 77,30 L 75,34
              L 78,38 L 76,42 L 78,46 L 76,50 L 78,54 L 76,58
              L 78,62 L 75,66 L 78,70 L 76,74 L 78,78 L 74,80
              L 70,82 L 66,80 L 62,82 L 58,80 L 54,82 L 50,84
              L 46,82 L 42,84 L 38,82 L 34,84 L 30,82
              L 28,78 L 26,74 L 28,70 L 25,66 L 27,62
              L 24,58 L 26,54 L 24,50 L 26,46 L 24,42
              L 26,38 L 28,34 L 26,30 L 28,26 L 30,22
              L 28,18 L 30,14 L 32,10 L 35,8 L 38,6 Z
            " fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" strokeLinejoin="round" />

            {/* Internal region lines */}
            <path d="M 35,30 L 55,28 L 70,35" stroke="rgba(255,255,255,0.05)" strokeWidth="0.3" fill="none" strokeDasharray="2,2" />
            <path d="M 30,50 L 50,48 L 72,55" stroke="rgba(255,255,255,0.05)" strokeWidth="0.3" fill="none" strokeDasharray="2,2" />
            <path d="M 35,70 L 55,68 L 70,72" stroke="rgba(255,255,255,0.05)" strokeWidth="0.3" fill="none" strokeDasharray="2,2" />

            {/* City labels */}
            <text x="50" y="96" fill="rgba(255,255,255,0.15)" fontSize="2.5" textAnchor="middle" fontWeight="900" letterSpacing="0.5">GOLFE DE GUINÉE</text>
            <text x="15" y="50" fill="rgba(255,255,255,0.08)" fontSize="2" textAnchor="middle" fontWeight="bold" transform="rotate(-90,15,50)">LIBÉRIA</text>
            <text x="88" y="50" fill="rgba(255,255,255,0.08)" fontSize="2" textAnchor="middle" fontWeight="bold" transform="rotate(90,88,50)">GHANA</text>
            <text x="40" y="2" fill="rgba(255,255,255,0.08)" fontSize="2" textAnchor="middle" fontWeight="bold">MALI</text>
            <text x="62" y="2" fill="rgba(255,255,255,0.08)" fontSize="2" textAnchor="middle" fontWeight="bold">BURKINA FASO</text>
          </svg>

          {/* Chantier Markers */}
          {chantiers.map((c) => {
            const sc = getStatusColor(c.status);
            const isSelected = selectedSite?.id === c.id;
            return (
              <motion.div
                key={c.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: c.id * 0.08, type: 'spring', stiffness: 200 }}
                className="absolute cursor-pointer group/pin z-10"
                style={{ left: `${c.x}%`, top: `${c.y}%`, transform: 'translate(-50%, -50%)' }}
                onClick={() => setSelectedSite(c)}
              >
                {/* Pulse ring */}
                <div className={`absolute inset-0 rounded-full ${sc.bg} opacity-30 ${c.status === 'error' ? 'animate-ping' : 'animate-pulse'}`} style={{ transform: 'scale(2.5)' }}></div>

                {/* Pin */}
                <div className={`relative w-5 h-5 rounded-full ${sc.bg} border-2 border-white shadow-lg flex items-center justify-center transition-transform ${isSelected ? 'scale-150 ring-4 ' + sc.ring : 'group-hover/pin:scale-125'}`}>
                  <HardHat size={10} className="text-white" />
                </div>

                {/* Label */}
                <div className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap transition-all pointer-events-none ${isSelected ? 'bottom-full mb-3 opacity-100 scale-100' : 'bottom-full mb-2 opacity-0 group-hover/pin:opacity-100 scale-90 group-hover/pin:scale-100'}`}>
                  <div className="bg-white/95 backdrop-blur-md px-3 py-2 rounded-xl shadow-2xl border border-slate-200 text-center">
                    <p className="text-[10px] font-black text-slate-900 leading-tight">{c.name}</p>
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">{c.city} • {c.progress}%</p>
                  </div>
                  <div className="w-2 h-2 bg-white border-b border-r border-slate-200 rotate-45 mx-auto -mt-1"></div>
                </div>
              </motion.div>
            );
          })}

          {/* Map Controls */}
          <div className="absolute top-6 right-6 flex flex-col gap-2 z-30">
            <button className="w-10 h-10 bg-white/10 backdrop-blur-xl border border-white/10 rounded-xl flex items-center justify-center text-white text-lg font-bold hover:bg-btp-cta transition-all">+</button>
            <button className="w-10 h-10 bg-white/10 backdrop-blur-xl border border-white/10 rounded-xl flex items-center justify-center text-white text-lg font-bold hover:bg-btp-cta transition-all">−</button>
          </div>

          {/* Selected site detail panel */}
          <AnimatePresence>
            {selectedSite && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute bottom-6 left-6 right-6 z-20 pointer-events-auto"
              >
                <div className="bg-slate-900/80 backdrop-blur-2xl rounded-[2rem] border border-white/10 p-6 flex items-center gap-6">
                  <div className={`w-14 h-14 rounded-2xl ${getStatusColor(selectedSite.status).bg}/20 flex items-center justify-center shrink-0`}>
                    <HardHat size={28} className={getStatusColor(selectedSite.status).text} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-bold text-lg truncate">{selectedSite.name}</h3>
                    <p className="text-white/50 text-xs font-bold uppercase tracking-wider mt-0.5 flex items-center gap-1.5">
                      <MapPin size={12} /> {selectedSite.city}
                    </p>
                  </div>
                  <div className="flex items-center gap-8 shrink-0">
                    <div className="text-center">
                      <p className="text-2xl font-black text-white">{selectedSite.progress}%</p>
                      <p className="text-[9px] text-white/40 font-bold uppercase tracking-widest">Avancement</p>
                    </div>
                    <div className="w-px h-10 bg-white/10"></div>
                    <div className="text-center">
                      <p className="text-2xl font-black text-btp-cta">{selectedSite.equipes}</p>
                      <p className="text-[9px] text-white/40 font-bold uppercase tracking-widest">Équipes</p>
                    </div>
                    <div className="w-px h-10 bg-white/10"></div>
                    <div className="text-center">
                      <p className="text-2xl font-black text-white">{selectedSite.engins}</p>
                      <p className="text-[9px] text-white/40 font-bold uppercase tracking-widest">Engins</p>
                    </div>
                    <div className="w-px h-10 bg-white/10"></div>
                    <div className="text-center">
                      <p className="text-sm font-black text-white">{selectedSite.chef}</p>
                      <p className="text-[9px] text-white/40 font-bold uppercase tracking-widest">Chef Chantier</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleInteraction(`Chantier : ${selectedSite.name}`, `Ouverture du dossier technique complet...`)}
                    className="btn-primary py-3 px-6 text-xs shrink-0 shadow-lg shadow-orange-500/20"
                  >
                    Ouvrir le Dossier
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Title overlay */}
          <div className="absolute top-6 left-6 z-20">
            <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 px-5 py-3">
              <p className="text-[9px] font-black text-white/30 uppercase tracking-[0.3em] mb-0.5">République de</p>
              <p className="text-white font-heading font-black text-lg tracking-tight">CÔTE D'IVOIRE</p>
              <p className="text-[10px] text-btp-cta font-bold mt-1">{chantiers.length} chantiers actifs sur le territoire</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

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
      case 'dashboard': return <DashboardView setActiveTab={setActiveTab} />;
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
        <div className="flex items-center gap-3 mb-10 px-2 shrink-0 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
          <div className="w-12 h-12 flex items-center justify-center transition-transform hover:rotate-6">
            <img
              src="/assets/EMBLEME_FOND_BLANC__1_-removebg-preview.png"
              alt="Kayry BTP Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h2 className="text-xl font-heading font-black tracking-tighter leading-none text-black">KAYRY BTP</h2>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] block mt-0.5">Manager Pro</span>
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
                <CloudRain className="text-btp-cta drop-shadow-[0_0_8px_rgba(249,115,22,0.4)]" size={18} />
                <span className="text-[10px] font-black uppercase tracking-widest text-[#fb923c] !text-[#fb923c] brightness-125">Alerte Météo AI</span>
              </div>
              <p className="text-[11px] leading-relaxed opacity-90 font-medium text-white/90">
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
