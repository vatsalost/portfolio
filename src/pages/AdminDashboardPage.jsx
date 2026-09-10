import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Plus, Edit2, Trash2, Star, StarOff, LogOut, ExternalLink, 
  RotateCcw, Check, X, Layers, Image, Tag, Eye 
} from 'lucide-react';
import { useProjects } from '../context/ProjectContext';
import { useAudio } from '../context/AudioContext';

export function AdminDashboardPage() {
  const navigate = useNavigate();
  const { projects, addProject, updateProject, deleteProject, toggleFeatured, resetProjects } = useProjects();
  const { playClick, playHover, playSuccess } = useAudio();

  // Authentication check
  useEffect(() => {
    const isAuth = localStorage.getItem('kaien_admin_auth') === 'true';
    if (!isAuth) {
      navigate('/admin');
    }
  }, [navigate]);

  const handleLogout = () => {
    playClick();
    localStorage.removeItem('kaien_admin_auth');
    navigate('/admin');
  };

  // Modal State for Add / Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    client: '',
    category: 'Digital Products',
    year: new Date().getFullYear().toString(),
    tagline: '',
    role: '',
    featured: false,
    thumbnail: '',
    heroImage: '',
    overview: '',
    problem: '',
    process: '',
    solution: '',
    stack: 'React, GSAP, Tailwind CSS',
    liveUrl: '',
    githubUrl: ''
  });

  const categories = ['Systems & Tooling', 'Graphics & Systems', 'AI & Real-Time Systems', 'Algorithms & Audio', 'Web & Distributed'];

  const openAddModal = () => {
    playClick();
    setEditingId(null);
    setFormData({
      title: '',
      client: 'Independent Project',
      category: 'Systems & Tooling',
      year: new Date().getFullYear().toString(),
      tagline: 'High-performance systems utility',
      role: 'Systems Developer',
      featured: false,
      thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop',
      heroImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1600&auto=format&fit=crop',
      overview: 'A systems project exploring algorithmic performance and interactive tooling.',
      problem: 'Optimizing computation throughput and reducing execution latency.',
      process: 'Implemented modular data structures and memory-safe design patterns.',
      solution: 'Delivered an efficient, verifiable implementation with minimal runtime overhead.',
      stack: 'C++, Rust, Linux POSIX',
      liveUrl: '',
      githubUrl: 'https://github.com/vatsalost'
    });
    setIsModalOpen(true);
  };

  const openEditModal = (project) => {
    playClick();
    setEditingId(project.id);
    setFormData({
      title: project.title,
      client: project.client || '',
      category: project.category || 'Digital Products',
      year: project.year || '',
      tagline: project.tagline || '',
      role: project.role || '',
      featured: project.featured || false,
      thumbnail: project.thumbnail || '',
      heroImage: project.heroImage || '',
      overview: project.overview || '',
      problem: project.problem || '',
      process: project.process || '',
      solution: project.solution || '',
      stack: Array.isArray(project.stack) ? project.stack.join(', ') : (project.stack || ''),
      liveUrl: project.liveUrl || '',
      githubUrl: project.githubUrl || ''
    });
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    playSuccess();

    const preparedData = {
      ...formData,
      stack: formData.stack.split(',').map(s => s.trim()).filter(Boolean)
    };

    if (editingId) {
      updateProject(editingId, preparedData);
    } else {
      addProject(preparedData);
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id, title) => {
    playClick();
    if (window.confirm(`Are you sure you want to delete "${title}"? This cannot be undone.`)) {
      deleteProject(id);
    }
  };

  const handleReset = () => {
    playClick();
    if (window.confirm('Reset all projects to curated default case studies? Any custom projects will be replaced.')) {
      resetProjects();
    }
  };

  const featuredCount = projects.filter(p => p.featured).length;

  return (
    <div className="min-h-screen bg-[#080808] text-[#F5F5F0] font-mono selection:bg-[#E10600]">
      {/* Top Bar */}
      <header className="bg-[#0D0D0D] border-b border-[#F5F5F0]/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-7 h-7 bg-[#E10600] text-white font-bold flex items-center justify-center font-display text-sm">
            K
          </div>
          <div>
            <span className="text-sm font-bold tracking-wider text-[#F5F5F0] block">
              PORTFOLIO CONTROL DECK
            </span>
            <span className="text-[10px] text-[#8E8E8E]">SESSION: AUTHENTICATED // ADMIN</span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <Link
            to="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#141414] border border-[#F5F5F0]/15 hover:border-[#E10600] text-[#F5F5F0] transition-colors"
          >
            <span>LIVE SITE</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#E10600]" />
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#E10600]/10 border border-[#E10600]/30 hover:bg-[#E10600] hover:text-white text-[#E10600] transition-all"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>TERMINATE SESSION</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="p-6 bg-[#121212] border border-[#F5F5F0]/10 space-y-1">
            <span className="text-xs text-[#8E8E8E] uppercase tracking-wider">TOTAL CASE STUDIES</span>
            <div className="font-display font-black text-4xl text-[#F5F5F0]">
              {projects.length}
            </div>
          </div>
          <div className="p-6 bg-[#121212] border border-[#F5F5F0]/10 space-y-1">
            <span className="text-xs text-[#8E8E8E] uppercase tracking-wider">FEATURED ON HOME</span>
            <div className="font-display font-black text-4xl text-[#E10600]">
              {featuredCount}
            </div>
          </div>
          <div className="p-6 bg-[#121212] border border-[#F5F5F0]/10 space-y-1">
            <span className="text-xs text-[#8E8E8E] uppercase tracking-wider">PERSISTENCE STORAGE</span>
            <div className="font-display font-black text-2xl text-[#F5F5F0] pt-1">
              LOCALSTORAGE ACTIVE
            </div>
          </div>
        </div>

        {/* Action Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-[#F5F5F0]/10 pb-4">
          <div>
            <h2 className="font-display font-bold text-xl text-[#F5F5F0] tracking-tight">
              PROJECT ARCHIVE INVENTORY
            </h2>
            <p className="text-xs text-[#8E8E8E]">Add, edit, re-feature, or remove case study records.</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleReset}
              className="px-3 py-2 bg-[#121212] border border-[#F5F5F0]/15 hover:border-[#E10600] text-xs text-[#8E8E8E] hover:text-[#F5F5F0] transition-colors flex items-center gap-1.5"
              title="Reset to default initial projects"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>RESET DEFAULTS</span>
            </button>
            <button
              onClick={openAddModal}
              className="px-4 py-2 bg-[#E10600] text-white hover:bg-[#B00500] font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors shadow-lg shadow-[#E10600]/20"
            >
              <Plus className="w-4 h-4" />
              <span>NEW PROJECT</span>
            </button>
          </div>
        </div>

        {/* Projects Table */}
        <div className="bg-[#121212] border border-[#F5F5F0]/10 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#F5F5F0]/10 bg-[#0A0A0A] text-[#8E8E8E] uppercase tracking-wider">
                <th className="py-4 px-4 w-12 text-center">FEATURED</th>
                <th className="py-4 px-4">THUMBNAIL</th>
                <th className="py-4 px-4">PROJECT TITLE</th>
                <th className="py-4 px-4">CATEGORY</th>
                <th className="py-4 px-4">YEAR</th>
                <th className="py-4 px-4 text-right">CONTROLS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5F5F0]/5">
              {projects.map((project) => (
                <tr key={project.id} className="hover:bg-[#181818] transition-colors">
                  {/* Featured Toggle */}
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => toggleFeatured(project.id)}
                      className="p-1 hover:text-[#E10600] transition-colors"
                      title={project.featured ? "Unfeature on Home" : "Feature on Home"}
                    >
                      {project.featured ? (
                        <Star className="w-4 h-4 text-[#E10600] fill-[#E10600]" />
                      ) : (
                        <StarOff className="w-4 h-4 text-[#8E8E8E]" />
                      )}
                    </button>
                  </td>

                  {/* Thumbnail */}
                  <td className="py-3 px-4">
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="w-14 h-10 object-cover bg-[#0A0A0A] border border-[#F5F5F0]/10"
                    />
                  </td>

                  {/* Title & Tagline */}
                  <td className="py-3 px-4">
                    <div className="font-bold text-[#F5F5F0] line-clamp-1">{project.title}</div>
                    <div className="text-[11px] text-[#8E8E8E] line-clamp-1">{project.tagline}</div>
                  </td>

                  {/* Category */}
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 bg-[#0A0A0A] border border-[#F5F5F0]/10 text-[10px] text-[#8E8E8E]">
                      {project.category}
                    </span>
                  </td>

                  {/* Year */}
                  <td className="py-3 px-4 text-[#8E8E8E]">{project.year}</td>

                  {/* Actions */}
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        to={`/project/${project.id}`}
                        target="_blank"
                        className="p-1.5 text-[#8E8E8E] hover:text-[#F5F5F0] transition-colors"
                        title="View Public Page"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => openEditModal(project)}
                        className="p-1.5 text-[#8E8E8E] hover:text-[#E10600] transition-colors"
                        title="Edit Record"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(project.id, project.title)}
                        className="p-1.5 text-[#8E8E8E] hover:text-[#E10600] transition-colors"
                        title="Delete Record"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#121212] border border-[#F5F5F0]/20 max-w-3xl w-full p-6 md:p-8 relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#F5F5F0]/10 pb-4 mb-6">
              <h3 className="font-display font-bold text-lg text-[#F5F5F0]">
                {editingId ? 'EDIT CASE STUDY RECORD' : 'CREATE NEW CASE STUDY'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-[#8E8E8E] hover:text-[#E10600] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-6 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#8E8E8E] mb-1">PROJECT TITLE *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-[#0A0A0A] border border-[#F5F5F0]/15 p-2.5 text-[#F5F5F0] focus:border-[#E10600] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#8E8E8E] mb-1">CLIENT / BRAND</label>
                  <input
                    type="text"
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    className="w-full bg-[#0A0A0A] border border-[#F5F5F0]/15 p-2.5 text-[#F5F5F0] focus:border-[#E10600] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[#8E8E8E] mb-1">CATEGORY</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-[#0A0A0A] border border-[#F5F5F0]/15 p-2.5 text-[#F5F5F0] focus:border-[#E10600] focus:outline-none"
                  >
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[#8E8E8E] mb-1">YEAR</label>
                  <input
                    type="text"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="w-full bg-[#0A0A0A] border border-[#F5F5F0]/15 p-2.5 text-[#F5F5F0] focus:border-[#E10600] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#8E8E8E] mb-1">ROLE</label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full bg-[#0A0A0A] border border-[#F5F5F0]/15 p-2.5 text-[#F5F5F0] focus:border-[#E10600] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#8E8E8E] mb-1">TAGLINE / ACCOLADE</label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  placeholder="E.g. Grand Prize Winner • Awwwards Site of the Day"
                  className="w-full bg-[#0A0A0A] border border-[#F5F5F0]/15 p-2.5 text-[#F5F5F0] focus:border-[#E10600] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#8E8E8E] mb-1">THUMBNAIL IMAGE URL</label>
                  <input
                    type="url"
                    required
                    value={formData.thumbnail}
                    onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                    className="w-full bg-[#0A0A0A] border border-[#F5F5F0]/15 p-2.5 text-[#F5F5F0] focus:border-[#E10600] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#8E8E8E] mb-1">HERO BANNER IMAGE URL</label>
                  <input
                    type="url"
                    value={formData.heroImage}
                    onChange={(e) => setFormData({ ...formData, heroImage: e.target.value })}
                    className="w-full bg-[#0A0A0A] border border-[#F5F5F0]/15 p-2.5 text-[#F5F5F0] focus:border-[#E10600] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#8E8E8E] mb-1">OVERVIEW BRIEF</label>
                <textarea
                  rows={2}
                  value={formData.overview}
                  onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
                  className="w-full bg-[#0A0A0A] border border-[#F5F5F0]/15 p-2.5 text-[#F5F5F0] focus:border-[#E10600] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[#8E8E8E] mb-1">PROBLEM STATEMENT</label>
                  <textarea
                    rows={3}
                    value={formData.problem}
                    onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                    className="w-full bg-[#0A0A0A] border border-[#F5F5F0]/15 p-2.5 text-[#F5F5F0] focus:border-[#E10600] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#8E8E8E] mb-1">ARCHITECTURAL PROCESS</label>
                  <textarea
                    rows={3}
                    value={formData.process}
                    onChange={(e) => setFormData({ ...formData, process: e.target.value })}
                    className="w-full bg-[#0A0A0A] border border-[#F5F5F0]/15 p-2.5 text-[#F5F5F0] focus:border-[#E10600] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#8E8E8E] mb-1">SOLUTION & OUTCOME</label>
                  <textarea
                    rows={3}
                    value={formData.solution}
                    onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                    className="w-full bg-[#0A0A0A] border border-[#F5F5F0]/15 p-2.5 text-[#F5F5F0] focus:border-[#E10600] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[#8E8E8E] mb-1">TECH STACK (COMMA-SEPARATED)</label>
                  <input
                    type="text"
                    value={formData.stack}
                    onChange={(e) => setFormData({ ...formData, stack: e.target.value })}
                    className="w-full bg-[#0A0A0A] border border-[#F5F5F0]/15 p-2.5 text-[#F5F5F0] focus:border-[#E10600] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#8E8E8E] mb-1">LIVE DEPLOYMENT URL</label>
                  <input
                    type="url"
                    value={formData.liveUrl}
                    onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                    className="w-full bg-[#0A0A0A] border border-[#F5F5F0]/15 p-2.5 text-[#F5F5F0] focus:border-[#E10600] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#8E8E8E] mb-1">GITHUB REPOSITORY URL</label>
                  <input
                    type="url"
                    value={formData.githubUrl}
                    onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                    className="w-full bg-[#0A0A0A] border border-[#F5F5F0]/15 p-2.5 text-[#F5F5F0] focus:border-[#E10600] focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="featuredCheck"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="accent-[#E10600] w-4 h-4 cursor-pointer"
                />
                <label htmlFor="featuredCheck" className="text-[#F5F5F0] cursor-pointer">
                  Feature this project on Homepage showcase
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#F5F5F0]/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-[#F5F5F0]/15 text-[#8E8E8E] hover:text-[#F5F5F0]"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#E10600] text-white hover:bg-[#B00500] font-bold uppercase tracking-wider"
                >
                  {editingId ? 'UPDATE RECORD' : 'SAVE NEW RECORD'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
