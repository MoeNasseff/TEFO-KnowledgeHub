/**
 * TE FlowOne Knowledge Dashboard
 * Main application JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    initSidebar();
    initNavigation();
    initSearch();
    loadServiceLifecycles();
    loadFlowOneArchitecture();
    loadProductsSection();
    loadCheatSheets();
});

/**
 * Initialize sidebar toggle functionality
 */
function initSidebar() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const toggleIcon = document.getElementById('toggle-icon');
    const mainContent = document.querySelector('main');

    // Mobile menu toggle
    menuBtn.addEventListener('click', () => {
        sidebar.classList.toggle('-translate-x-full');
        overlay.classList.toggle('hidden');
    });

    overlay.addEventListener('click', () => {
        sidebar.classList.add('-translate-x-full');
        overlay.classList.add('hidden');
    });

    // Desktop sidebar collapse toggle
    let sidebarCollapsed = false;
    sidebarToggle.addEventListener('click', () => {
        sidebarCollapsed = !sidebarCollapsed;
        if (sidebarCollapsed) {
            sidebar.classList.add('lg:-translate-x-full');
            mainContent.classList.remove('lg:ml-72');
            mainContent.classList.add('lg:ml-0');
            toggleIcon.classList.remove('fa-chevron-left');
            toggleIcon.classList.add('fa-chevron-right');
            // Move toggle button to left edge when sidebar collapsed
            sidebarToggle.style.left = '1rem';
        } else {
            sidebar.classList.remove('lg:-translate-x-full');
            mainContent.classList.add('lg:ml-72');
            mainContent.classList.remove('lg:ml-0');
            toggleIcon.classList.add('fa-chevron-left');
            toggleIcon.classList.remove('fa-chevron-right');
            // Move toggle button back to sidebar edge
            sidebarToggle.style.left = '19rem';
        }
    });

    // Close sidebar on link click (mobile)
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 1024) {
                sidebar.classList.add('-translate-x-full');
                overlay.classList.add('hidden');
            }
        });
    });
}

/**
 * Initialize collapsible navigation sections
 */
function initNavigation() {
    const navHeaders = document.querySelectorAll('.nav-header');
    
    navHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const isExpanded = content.classList.contains('expanded');
            
            // Close all other sections
            document.querySelectorAll('.nav-content').forEach(c => {
                c.classList.remove('expanded');
                c.classList.add('hidden');
            });
            document.querySelectorAll('.nav-header').forEach(h => {
                h.classList.remove('active');
            });
            
            // Toggle current section
            if (!isExpanded) {
                content.classList.add('expanded');
                content.classList.remove('hidden');
                header.classList.add('active');
            }
        });
    });

    // Expand first section by default
    const firstHeader = document.querySelector('.nav-header');
    if (firstHeader) {
        firstHeader.click();
    }

    // Highlight active section based on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

/**
 * Initialize search functionality
 */
function initSearch() {
    const searchInput = document.getElementById('search-input');
    
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        
        if (query.length < 2) {
            clearHighlights();
            return;
        }

        // Search in all text content
        const sections = document.querySelectorAll('section');
        let found = false;

        sections.forEach(section => {
            const text = section.textContent.toLowerCase();
            if (text.includes(query)) {
                if (!found) {
                    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    found = true;
                }
            }
        });
    });

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    });
}

function clearHighlights() {
    document.querySelectorAll('.search-highlight').forEach(el => {
        el.outerHTML = el.textContent;
    });
}

/**
 * Load cheat sheets content
 */
function loadCheatSheets() {
    const linuxSection = document.getElementById('linux-admin');
    
    linuxSection.innerHTML = `
        <div class="bg-secondary rounded-2xl p-6 shadow-xl">
            <h2 class="text-2xl font-bold mb-6 flex items-center">
                <i class="fab fa-linux mr-3 text-yellow-400"></i>Linux Admin Cheat Sheet (RHEL 1 & 2) - Certification Level
            </h2>
            <p class="text-gray-400 mb-4">Comprehensive guide for RHCSA (EX200) & RHCE (EX294) certification exams</p>
            
            <!-- Tab Navigation -->
            <div class="tab-container flex-wrap">
                <button class="tab-btn active" data-tab="basics">File System</button>
                <button class="tab-btn" data-tab="users">Users & Groups</button>
                <button class="tab-btn" data-tab="permissions">Permissions & ACLs</button>
                <button class="tab-btn" data-tab="network">Networking</button>
                <button class="tab-btn" data-tab="storage">Storage & LVM</button>
                <button class="tab-btn" data-tab="services">Services & Boot</button>
                <button class="tab-btn" data-tab="selinux">SELinux</button>
                <button class="tab-btn" data-tab="containers">Containers</button>
                <button class="tab-btn" data-tab="automation">Automation</button>
                <button class="tab-btn" data-tab="troubleshoot">Troubleshoot</button>
            </div>

            <!-- Tab Content: Basics -->
            <div id="tab-basics" class="tab-content active">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="cheat-sheet-card p-4 rounded-xl">
                        <h4 class="font-semibold text-blue-400 mb-3"><i class="fas fa-folder mr-2"></i>File Navigation</h4>
                        <div class="code-block">
                            <code>
<span class="comment"># List files</span>
ls -la                <span class="comment"># detailed with hidden</span>
ls -lh                <span class="comment"># human readable sizes</span>

<span class="comment"># Navigate</span>
cd /path/to/dir       <span class="comment"># change directory</span>
cd ..                 <span class="comment"># parent directory</span>
cd ~                  <span class="comment"># home directory</span>
pwd                   <span class="comment"># print working dir</span>

<span class="comment"># Find files</span>
find / -name "*.log"  <span class="comment"># find by name</span>
find / -size +100M    <span class="comment"># find by size</span>
locate filename       <span class="comment"># quick search (updatedb)</span>
                            </code>
                        </div>
                    </div>

                    <div class="cheat-sheet-card p-4 rounded-xl">
                        <h4 class="font-semibold text-green-400 mb-3"><i class="fas fa-file mr-2"></i>File Operations</h4>
                        <div class="code-block">
                            <code>
<span class="comment"># Copy, Move, Delete</span>
cp source dest        <span class="comment"># copy file</span>
cp -r src dest        <span class="comment"># copy directory</span>
mv old new            <span class="comment"># move/rename</span>
rm file               <span class="comment"># remove file</span>
rm -rf dir            <span class="comment"># remove dir (DANGER!)</span>

<span class="comment"># View files</span>
cat file              <span class="comment"># entire file</span>
head -n 20 file       <span class="comment"># first 20 lines</span>
tail -f file          <span class="comment"># follow log file</span>
less file             <span class="comment"># paginated view</span>
                            </code>
                        </div>
                    </div>

                    <div class="cheat-sheet-card p-4 rounded-xl">
                        <h4 class="font-semibold text-purple-400 mb-3"><i class="fas fa-search mr-2"></i>Text Processing</h4>
                        <div class="code-block">
                            <code>
<span class="comment"># Search in files</span>
grep "pattern" file   <span class="comment"># search pattern</span>
grep -r "text" /dir   <span class="comment"># recursive search</span>
grep -i "text" file   <span class="comment"># case insensitive</span>
grep -v "exclude"     <span class="comment"># invert match</span>

<span class="comment"># Text manipulation</span>
sed 's/old/new/g' file   <span class="comment"># replace</span>
awk '{print $1}' file    <span class="comment"># print column</span>
cut -d: -f1 /etc/passwd  <span class="comment"># extract field</span>
sort file | uniq         <span class="comment"># unique lines</span>
                            </code>
                        </div>
                    </div>

                    <div class="cheat-sheet-card p-4 rounded-xl">
                        <h4 class="font-semibold text-orange-400 mb-3"><i class="fas fa-archive mr-2"></i>Compression</h4>
                        <div class="code-block">
                            <code>
<span class="comment"># tar operations</span>
tar -cvf arch.tar dir    <span class="comment"># create</span>
tar -xvf arch.tar        <span class="comment"># extract</span>
tar -czvf arch.tar.gz dir <span class="comment"># gzip</span>
tar -xzvf arch.tar.gz    <span class="comment"># extract gz</span>

<span class="comment"># other formats</span>
gzip file                <span class="comment"># compress</span>
gunzip file.gz           <span class="comment"># decompress</span>
zip -r arch.zip dir      <span class="comment"># zip</span>
unzip arch.zip           <span class="comment"># unzip</span>
                            </code>
                        </div>
                    </div>
                </div>

                <!-- Memory Aid -->
                <div class="memory-card mt-6">
                    <h4><i class="fas fa-brain mr-2"></i>Memory Aid: tar flags</h4>
                    <p class="mnemonic">c = Create, x = eXtract, v = Verbose, f = File, z = gZip</p>
                    <p class="text-sm text-gray-400 mt-2">"Create Xtreme Victory For Zombies" - Remember tar flags!</p>
                </div>
            </div>

            <!-- Tab Content: Users -->
            <div id="tab-users" class="tab-content">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="cheat-sheet-card p-4 rounded-xl">
                        <h4 class="font-semibold text-blue-400 mb-3"><i class="fas fa-user-plus mr-2"></i>User Management</h4>
                        <div class="code-block">
                            <code>
<span class="comment"># Create/Modify users</span>
useradd username         <span class="comment"># create user</span>
useradd -m -s /bin/bash user <span class="comment"># with home & shell</span>
usermod -aG group user   <span class="comment"># add to group</span>
userdel -r username      <span class="comment"># delete with home</span>
passwd username          <span class="comment"># set password</span>

<span class="comment"># User info</span>
id username              <span class="comment"># user details</span>
whoami                   <span class="comment"># current user</span>
who                      <span class="comment"># logged in users</span>
last                     <span class="comment"># login history</span>
                            </code>
                        </div>
                    </div>

                    <div class="cheat-sheet-card p-4 rounded-xl">
                        <h4 class="font-semibold text-green-400 mb-3"><i class="fas fa-users mr-2"></i>Group Management</h4>
                        <div class="code-block">
                            <code>
<span class="comment"># Groups</span>
groupadd groupname       <span class="comment"># create group</span>
groupdel groupname       <span class="comment"># delete group</span>
groups username          <span class="comment"># list user groups</span>
gpasswd -a user group    <span class="comment"># add to group</span>
gpasswd -d user group    <span class="comment"># remove from group</span>

<span class="comment"># Important files</span>
/etc/passwd              <span class="comment"># user accounts</span>
/etc/shadow              <span class="comment"># passwords</span>
/etc/group               <span class="comment"># groups</span>
                            </code>
                        </div>
                    </div>

                    <div class="cheat-sheet-card p-4 rounded-xl">
                        <h4 class="font-semibold text-purple-400 mb-3"><i class="fas fa-lock mr-2"></i>Permissions</h4>
                        <div class="code-block">
                            <code>
<span class="comment"># chmod (change mode)</span>
chmod 755 file           <span class="comment"># rwxr-xr-x</span>
chmod u+x file           <span class="comment"># add execute for owner</span>
chmod -R 644 dir         <span class="comment"># recursive</span>

<span class="comment"># Permission numbers</span>
4 = read (r)
2 = write (w)
1 = execute (x)
<span class="comment"># Example: 755 = rwx(7) r-x(5) r-x(5)</span>

<span class="comment"># chown (change owner)</span>
chown user:group file    <span class="comment"># change ownership</span>
chown -R user dir        <span class="comment"># recursive</span>
                            </code>
                        </div>
                    </div>

                    <div class="cheat-sheet-card p-4 rounded-xl">
                        <h4 class="font-semibold text-orange-400 mb-3"><i class="fas fa-shield-alt mr-2"></i>Special Permissions</h4>
                        <div class="code-block">
                            <code>
<span class="comment"># SUID, SGID, Sticky</span>
chmod u+s file           <span class="comment"># SUID (4xxx)</span>
chmod g+s dir            <span class="comment"># SGID (2xxx)</span>
chmod +t dir             <span class="comment"># Sticky (1xxx)</span>

<span class="comment"># ACLs (Access Control Lists)</span>
getfacl file             <span class="comment"># view ACLs</span>
setfacl -m u:user:rwx file <span class="comment"># set ACL</span>
setfacl -x u:user file   <span class="comment"># remove ACL</span>
setfacl -b file          <span class="comment"># remove all ACLs</span>
                            </code>
                        </div>
                    </div>
                </div>

                <!-- Memory Aid -->
                <div class="memory-card mt-6">
                    <h4><i class="fas fa-brain mr-2"></i>Memory Aid: Permission Numbers</h4>
                    <p class="mnemonic">4-2-1 = R-W-X</p>
                    <p class="text-sm text-gray-400 mt-2">755 = Owner(4+2+1) Group(4+1) Others(4+1) = rwxr-xr-x</p>
                    <p class="text-sm text-gray-400">644 = Owner(4+2) Group(4) Others(4) = rw-r--r--</p>
                </div>
            </div>

            <!-- Tab Content: Network -->
            <div id="tab-network" class="tab-content">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="cheat-sheet-card p-4 rounded-xl">
                        <h4 class="font-semibold text-blue-400 mb-3"><i class="fas fa-network-wired mr-2"></i>Network Config</h4>
                        <div class="code-block">
                            <code>
<span class="comment"># View network</span>
ip addr show             <span class="comment"># IP addresses</span>
ip route show            <span class="comment"># routing table</span>
nmcli connection show    <span class="comment"># NetworkManager</span>
ss -tuln                 <span class="comment"># listening ports</span>
netstat -tuln            <span class="comment"># alt: ports</span>

<span class="comment"># Configure</span>
nmcli con mod eth0 ipv4.addresses "[IP_MASKED]/24"
nmcli con mod eth0 ipv4.gateway "[IP_MASKED]"
nmcli con mod eth0 ipv4.method manual
nmcli con up eth0        <span class="comment"># apply changes</span>
                            </code>
                        </div>
                    </div>

                    <div class="cheat-sheet-card p-4 rounded-xl">
                        <h4 class="font-semibold text-green-400 mb-3"><i class="fas fa-fire-alt mr-2"></i>Firewall (firewalld)</h4>
                        <div class="code-block">
                            <code>
<span class="comment"># firewalld commands</span>
firewall-cmd --state     <span class="comment"># status</span>
firewall-cmd --list-all  <span class="comment"># show rules</span>
firewall-cmd --get-zones <span class="comment"># list zones</span>

<span class="comment"># Add rules (permanent)</span>
firewall-cmd --permanent --add-port=8080/tcp
firewall-cmd --permanent --add-service=http
firewall-cmd --reload    <span class="comment"># apply</span>

<span class="comment"># Remove rules</span>
firewall-cmd --permanent --remove-port=8080/tcp
                            </code>
                        </div>
                    </div>

                    <div class="cheat-sheet-card p-4 rounded-xl">
                        <h4 class="font-semibold text-purple-400 mb-3"><i class="fas fa-plug mr-2"></i>Connectivity</h4>
                        <div class="code-block">
                            <code>
<span class="comment"># Test connectivity</span>
ping hostname            <span class="comment"># ICMP test</span>
traceroute hostname      <span class="comment"># route path</span>
curl -I http://url       <span class="comment"># HTTP headers</span>
wget url                 <span class="comment"># download</span>
ssh user@host            <span class="comment"># remote login</span>
scp file user@host:/path <span class="comment"># secure copy</span>

<span class="comment"># DNS</span>
nslookup hostname
dig hostname
host hostname
                            </code>
                        </div>
                    </div>

                    <div class="cheat-sheet-card p-4 rounded-xl">
                        <h4 class="font-semibold text-orange-400 mb-3"><i class="fas fa-file-alt mr-2"></i>Config Files</h4>
                        <div class="code-block">
                            <code>
<span class="comment"># Important network files</span>
/etc/hosts               <span class="comment"># local DNS</span>
/etc/resolv.conf         <span class="comment"># DNS servers</span>
/etc/hostname            <span class="comment"># system hostname</span>
/etc/sysconfig/network-scripts/
                         <span class="comment"># interface configs</span>

<span class="comment"># NetworkManager</span>
/etc/NetworkManager/system-connections/
nmtui                    <span class="comment"># TUI config</span>
                            </code>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Tab Content: Storage -->
            <div id="tab-storage" class="tab-content">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="cheat-sheet-card p-4 rounded-xl">
                        <h4 class="font-semibold text-blue-400 mb-3"><i class="fas fa-hdd mr-2"></i>Disk Management</h4>
                        <div class="code-block">
                            <code>
<span class="comment"># View disks</span>
lsblk                    <span class="comment"># block devices</span>
fdisk -l                 <span class="comment"># partition list</span>
df -h                    <span class="comment"># disk usage</span>
du -sh /path             <span class="comment"># directory size</span>

<span class="comment"># Partition (fdisk)</span>
fdisk /dev/sdb           <span class="comment"># partition disk</span>
  n                      <span class="comment"># new partition</span>
  w                      <span class="comment"># write changes</span>

<span class="comment"># Format</span>
mkfs.xfs /dev/sdb1       <span class="comment"># XFS filesystem</span>
mkfs.ext4 /dev/sdb1      <span class="comment"># ext4 filesystem</span>
                            </code>
                        </div>
                    </div>

                    <div class="cheat-sheet-card p-4 rounded-xl">
                        <h4 class="font-semibold text-green-400 mb-3"><i class="fas fa-database mr-2"></i>LVM (Logical Volume)</h4>
                        <div class="code-block">
                            <code>
<span class="comment"># Physical Volumes</span>
pvcreate /dev/sdb1       <span class="comment"># create PV</span>
pvs                      <span class="comment"># list PVs</span>

<span class="comment"># Volume Groups</span>
vgcreate vgname /dev/sdb1 <span class="comment"># create VG</span>
vgextend vgname /dev/sdc1 <span class="comment"># extend VG</span>
vgs                      <span class="comment"># list VGs</span>

<span class="comment"># Logical Volumes</span>
lvcreate -L 10G -n lvname vgname
lvextend -L +5G /dev/vgname/lvname
lvs                      <span class="comment"># list LVs</span>
                            </code>
                        </div>
                    </div>

                    <div class="cheat-sheet-card p-4 rounded-xl">
                        <h4 class="font-semibold text-purple-400 mb-3"><i class="fas fa-folder-open mr-2"></i>Mount</h4>
                        <div class="code-block">
                            <code>
<span class="comment"># Mount filesystem</span>
mount /dev/sdb1 /mnt     <span class="comment"># temporary mount</span>
umount /mnt              <span class="comment"># unmount</span>

<span class="comment"># Permanent mount (fstab)</span>
vi /etc/fstab
/dev/sdb1  /data  xfs  defaults  0 0

<span class="comment"># Mount options</span>
mount -o ro /dev/sdb1 /mnt   <span class="comment"># read-only</span>
mount -a                 <span class="comment"># mount all fstab</span>
                            </code>
                        </div>
                    </div>

                    <div class="cheat-sheet-card p-4 rounded-xl">
                        <h4 class="font-semibold text-orange-400 mb-3"><i class="fas fa-exchange-alt mr-2"></i>Swap</h4>
                        <div class="code-block">
                            <code>
<span class="comment"># Create swap</span>
mkswap /dev/sdb2         <span class="comment"># format as swap</span>
swapon /dev/sdb2         <span class="comment"># enable</span>
swapoff /dev/sdb2        <span class="comment"># disable</span>
swapon -s                <span class="comment"># show swap status</span>
free -h                  <span class="comment"># memory + swap</span>

<span class="comment"># Swap file</span>
dd if=/dev/zero of=/swapfile bs=1M count=1024
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
                            </code>
                        </div>
                    </div>
                </div>

                <!-- Memory Aid -->
                <div class="memory-card mt-6">
                    <h4><i class="fas fa-brain mr-2"></i>Memory Aid: LVM Hierarchy</h4>
                    <p class="mnemonic">PV → VG → LV</p>
                    <p class="text-sm text-gray-400 mt-2">Physical Volume → Volume Group → Logical Volume</p>
                    <p class="text-sm text-gray-400">"Pizza Very Good Lunch Very Late"</p>
                </div>
            </div>

            <!-- Tab Content: Services -->
            <div id="tab-services" class="tab-content">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="cheat-sheet-card p-4 rounded-xl">
                        <h4 class="font-semibold text-blue-400 mb-3"><i class="fas fa-cog mr-2"></i>systemctl Commands</h4>
                        <div class="code-block">
                            <code>
<span class="comment"># Service control</span>
systemctl start sshd     <span class="comment"># start service</span>
systemctl stop sshd      <span class="comment"># stop service</span>
systemctl restart sshd   <span class="comment"># restart</span>
systemctl reload sshd    <span class="comment"># reload config</span>
systemctl status sshd    <span class="comment"># check status</span>

<span class="comment"># Enable/Disable on boot</span>
systemctl enable sshd    <span class="comment"># start at boot</span>
systemctl disable sshd   <span class="comment"># don't start at boot</span>
systemctl is-enabled sshd <span class="comment"># check if enabled</span>
                            </code>
                        </div>
                    </div>

                    <div class="cheat-sheet-card p-4 rounded-xl">
                        <h4 class="font-semibold text-green-400 mb-3"><i class="fas fa-list mr-2"></i>Service Management</h4>
                        <div class="code-block">
                            <code>
<span class="comment"># List services</span>
systemctl list-units --type=service
systemctl list-unit-files --type=service
systemctl list-dependencies sshd

<span class="comment"># System targets (runlevels)</span>
systemctl get-default    <span class="comment"># current target</span>
systemctl set-default multi-user.target
systemctl isolate graphical.target

<span class="comment"># Common targets</span>
multi-user.target        <span class="comment"># runlevel 3</span>
graphical.target         <span class="comment"># runlevel 5</span>
                            </code>
                        </div>
                    </div>

                    <div class="cheat-sheet-card p-4 rounded-xl">
                        <h4 class="font-semibold text-purple-400 mb-3"><i class="fas fa-clock mr-2"></i>Scheduled Tasks</h4>
                        <div class="code-block">
                            <code>
<span class="comment"># Crontab</span>
crontab -e               <span class="comment"># edit user cron</span>
crontab -l               <span class="comment"># list cron jobs</span>
crontab -r               <span class="comment"># remove all jobs</span>

<span class="comment"># Cron format</span>
* * * * * command
│ │ │ │ │
│ │ │ │ └── day of week (0-6)
│ │ │ └──── month (1-12)
│ │ └────── day of month (1-31)
│ └──────── hour (0-23)
└────────── minute (0-59)

<span class="comment"># Example: 2am daily</span>
0 2 * * * /path/to/script.sh
                            </code>
                        </div>
                    </div>

                    <div class="cheat-sheet-card p-4 rounded-xl">
                        <h4 class="font-semibold text-orange-400 mb-3"><i class="fas fa-file-alt mr-2"></i>Logs (journalctl)</h4>
                        <div class="code-block">
                            <code>
<span class="comment"># View logs</span>
journalctl               <span class="comment"># all logs</span>
journalctl -u sshd       <span class="comment"># service logs</span>
journalctl -f            <span class="comment"># follow (tail)</span>
journalctl --since "1 hour ago"
journalctl -p err        <span class="comment"># errors only</span>

<span class="comment"># Traditional logs</span>
/var/log/messages        <span class="comment"># system</span>
/var/log/secure          <span class="comment"># auth</span>
/var/log/boot.log        <span class="comment"># boot</span>
                            </code>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Tab Content: Troubleshoot -->
            <div id="tab-troubleshoot" class="tab-content">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="cheat-sheet-card p-4 rounded-xl">
                        <h4 class="font-semibold text-blue-400 mb-3"><i class="fas fa-microchip mr-2"></i>System Resources</h4>
                        <div class="code-block">
                            <code>
<span class="comment"># CPU & Memory</span>
top                      <span class="comment"># real-time monitor</span>
htop                     <span class="comment"># better top</span>
free -h                  <span class="comment"># memory usage</span>
vmstat 1                 <span class="comment"># virtual memory stats</span>

<span class="comment"># Process management</span>
ps aux                   <span class="comment"># all processes</span>
ps -ef | grep name       <span class="comment"># find process</span>
kill PID                 <span class="comment"># terminate</span>
kill -9 PID              <span class="comment"># force kill</span>
pkill processname        <span class="comment"># kill by name</span>
                            </code>
                        </div>
                    </div>

                    <div class="cheat-sheet-card p-4 rounded-xl">
                        <h4 class="font-semibold text-green-400 mb-3"><i class="fas fa-tachometer-alt mr-2"></i>Performance</h4>
                        <div class="code-block">
                            <code>
<span class="comment"># I/O Stats</span>
iostat                   <span class="comment"># disk I/O</span>
iotop                    <span class="comment"># I/O by process</span>

<span class="comment"># System info</span>
uptime                   <span class="comment"># load average</span>
dmesg | tail             <span class="comment"># kernel messages</span>
lscpu                    <span class="comment"># CPU info</span>
lsmem                    <span class="comment"># memory info</span>

<span class="comment"># Load average meaning</span>
1 min, 5 min, 15 min average
> num_cpus = overloaded
                            </code>
                        </div>
                    </div>

                    <div class="cheat-sheet-card p-4 rounded-xl">
                        <h4 class="font-semibold text-purple-400 mb-3"><i class="fas fa-shield-alt mr-2"></i>SELinux</h4>
                        <div class="code-block">
                            <code>
<span class="comment"># SELinux status</span>
getenforce               <span class="comment"># current mode</span>
sestatus                 <span class="comment"># detailed status</span>

<span class="comment"># Modes</span>
setenforce 0             <span class="comment"># Permissive</span>
setenforce 1             <span class="comment"># Enforcing</span>

<span class="comment"># Contexts</span>
ls -Z file               <span class="comment"># view context</span>
chcon -t httpd_sys_content_t /var/www
restorecon -Rv /path     <span class="comment"># restore default</span>

<span class="comment"># Troubleshoot</span>
ausearch -m avc          <span class="comment"># denied actions</span>
sealert -a /var/log/audit/audit.log
                            </code>
                        </div>
                    </div>

                    <div class="cheat-sheet-card p-4 rounded-xl">
                        <h4 class="font-semibold text-red-400 mb-3"><i class="fas fa-first-aid mr-2"></i>Recovery</h4>
                        <div class="code-block">
                            <code>
<span class="comment"># Boot issues</span>
1. Reboot, press 'e' at GRUB
2. Add 'rd.break' to kernel line
3. Press Ctrl+X to boot
4. mount -o remount,rw /sysroot
5. chroot /sysroot
6. passwd root
7. touch /.autorelabel
8. exit twice

<span class="comment"># Reset root password</span>
# Follow steps above
                            </code>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Tab Content: Permissions & ACLs -->
            <div id="tab-permissions" class="tab-content">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="cheat-sheet-card p-4 rounded-xl">
                        <h4 class="font-semibold text-blue-400 mb-3"><i class="fas fa-lock mr-2"></i>Standard Permissions</h4>
                        <div class="code-block">
                            <code>
<span class="comment"># chmod numeric</span>
chmod 755 file           <span class="comment"># rwxr-xr-x</span>
chmod 644 file           <span class="comment"># rw-r--r--</span>
chmod 700 dir            <span class="comment"># rwx------</span>

<span class="comment"># chmod symbolic</span>
chmod u+x file           <span class="comment"># add exec for user</span>
chmod g-w file           <span class="comment"># remove write for group</span>
chmod o=r file           <span class="comment"># set others to read only</span>
chmod a+x file           <span class="comment"># add exec for all</span>

<span class="comment"># Recursive</span>
chmod -R 755 /path       <span class="comment"># apply to all files/dirs</span>
find /path -type f -exec chmod 644 {} \\;
find /path -type d -exec chmod 755 {} \\;
                            </code>
                        </div>
                    </div>

                    <div class="cheat-sheet-card p-4 rounded-xl">
                        <h4 class="font-semibold text-green-400 mb-3"><i class="fas fa-user-shield mr-2"></i>Ownership</h4>
                        <div class="code-block">
                            <code>
<span class="comment"># Change owner</span>
chown user file          <span class="comment"># change user owner</span>
chown user:group file    <span class="comment"># change user and group</span>
chown :group file        <span class="comment"># change group only</span>
chown -R user:group dir  <span class="comment"># recursive</span>

<span class="comment"># Change group</span>
chgrp group file         <span class="comment"># change group</span>
chgrp -R group dir       <span class="comment"># recursive</span>

<span class="comment"># View ownership</span>
ls -l file               <span class="comment"># show owner:group</span>
stat file                <span class="comment"># detailed info</span>
                            </code>
                        </div>
                    </div>

                    <div class="cheat-sheet-card p-4 rounded-xl">
                        <h4 class="font-semibold text-purple-400 mb-3"><i class="fas fa-star mr-2"></i>Special Permissions</h4>
                        <div class="code-block">
                            <code>
<span class="comment"># SUID (4xxx) - Run as owner</span>
chmod u+s /usr/bin/passwd  <span class="comment"># 4755</span>
chmod 4755 file

<span class="comment"># SGID (2xxx) - Inherit group</span>
chmod g+s /shared/dir      <span class="comment"># 2775</span>
chmod 2775 dir             <span class="comment"># new files get dir's group</span>

<span class="comment"># Sticky Bit (1xxx) - Delete own only</span>
chmod +t /tmp              <span class="comment"># 1777</span>
chmod 1777 dir             <span class="comment"># only owner can delete</span>

<span class="comment"># View special perms</span>
ls -l                      <span class="comment"># s=SUID/SGID, t=sticky</span>
                            </code>
                        </div>
                    </div>

                    <div class="cheat-sheet-card p-4 rounded-xl">
                        <h4 class="font-semibold text-orange-400 mb-3"><i class="fas fa-list-alt mr-2"></i>ACLs (Access Control Lists)</h4>
                        <div class="code-block">
                            <code>
<span class="comment"># View ACLs</span>
getfacl file             <span class="comment"># show ACLs</span>
getfacl -R dir           <span class="comment"># recursive</span>

<span class="comment"># Set ACLs</span>
setfacl -m u:user:rwx file   <span class="comment"># add user perm</span>
setfacl -m g:group:rx file   <span class="comment"># add group perm</span>
setfacl -m o::r file         <span class="comment"># set other perm</span>

<span class="comment"># Default ACLs (for new files in dir)</span>
setfacl -m d:u:user:rwx dir

<span class="comment"># Remove ACLs</span>
setfacl -x u:user file       <span class="comment"># remove specific</span>
setfacl -b file              <span class="comment"># remove all</span>
                            </code>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Tab Content: SELinux -->
            <div id="tab-selinux" class="tab-content">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="cheat-sheet-card p-4 rounded-xl">
                        <h4 class="font-semibold text-blue-400 mb-3"><i class="fas fa-shield-alt mr-2"></i>SELinux Modes</h4>
                        <div class="code-block">
                            <code>
<span class="comment"># Check status</span>
getenforce               <span class="comment"># Enforcing/Permissive/Disabled</span>
sestatus                 <span class="comment"># detailed status</span>

<span class="comment"># Change mode (runtime)</span>
setenforce 0             <span class="comment"># Permissive (temp)</span>
setenforce 1             <span class="comment"># Enforcing (temp)</span>

<span class="comment"># Permanent change (/etc/selinux/config)</span>
SELINUX=enforcing        <span class="comment"># or permissive/disabled</span>
SELINUXTYPE=targeted

<span class="comment"># After changing to disabled: REBOOT required</span>
<span class="comment"># After re-enabling: touch /.autorelabel && reboot</span>
                            </code>
                        </div>
                    </div>

                    <div class="cheat-sheet-card p-4 rounded-xl">
                        <h4 class="font-semibold text-green-400 mb-3"><i class="fas fa-tag mr-2"></i>SELinux Contexts</h4>
                        <div class="code-block">
                            <code>
<span class="comment"># View contexts</span>
ls -Z file               <span class="comment"># file context</span>
ps -eZ                   <span class="comment"># process context</span>
id -Z                    <span class="comment"># user context</span>

<span class="comment"># Context format: user:role:type:level</span>
<span class="comment"># Example: system_u:object_r:httpd_sys_content_t:s0</span>

<span class="comment"># Change context (temporary)</span>
chcon -t httpd_sys_content_t /var/www/html/file

<span class="comment"># Restore default context</span>
restorecon -Rv /var/www/html

<span class="comment"># Set default context for path</span>
semanage fcontext -a -t httpd_sys_content_t "/web(/.*)?"
restorecon -Rv /web
                            </code>
                        </div>
                    </div>

                    <div class="cheat-sheet-card p-4 rounded-xl">
                        <h4 class="font-semibold text-purple-400 mb-3"><i class="fas fa-toggle-on mr-2"></i>SELinux Booleans</h4>
                        <div class="code-block">
                            <code>
<span class="comment"># List booleans</span>
getsebool -a             <span class="comment"># all booleans</span>
getsebool httpd_enable_homedirs

<span class="comment"># Search booleans</span>
semanage boolean -l | grep httpd

<span class="comment"># Set boolean (temporary)</span>
setsebool httpd_enable_homedirs on

<span class="comment"># Set boolean (permanent)</span>
setsebool -P httpd_enable_homedirs on

<span class="comment"># Common booleans</span>
httpd_can_network_connect
httpd_use_nfs
ftpd_full_access
samba_enable_home_dirs
                            </code>
                        </div>
                    </div>

                    <div class="cheat-sheet-card p-4 rounded-xl">
                        <h4 class="font-semibold text-red-400 mb-3"><i class="fas fa-bug mr-2"></i>SELinux Troubleshooting</h4>
                        <div class="code-block">
                            <code>
<span class="comment"># View denials</span>
ausearch -m avc -ts recent
grep "denied" /var/log/audit/audit.log

<span class="comment"># Analyze with sealert</span>
sealert -a /var/log/audit/audit.log

<span class="comment"># Generate policy module</span>
audit2allow -a           <span class="comment"># show what to allow</span>
audit2allow -a -M mypol  <span class="comment"># create module</span>
semodule -i mypol.pp     <span class="comment"># install module</span>

<span class="comment"># Common fixes</span>
restorecon -Rv /path     <span class="comment"># fix context</span>
setsebool -P bool on     <span class="comment"># enable feature</span>
semanage port -a -t http_port_t -p tcp 8080
                            </code>
                        </div>
                    </div>
                </div>
                <div class="memory-card mt-6">
                    <h4><i class="fas fa-brain mr-2"></i>Memory Aid: SELinux Troubleshooting Steps</h4>
                    <p class="mnemonic">1. Check mode (getenforce) → 2. Check logs (ausearch) → 3. Fix context OR boolean OR port</p>
                </div>
            </div>

            <!-- Tab Content: Containers -->
            <div id="tab-containers" class="tab-content">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="cheat-sheet-card p-4 rounded-xl">
                        <h4 class="font-semibold text-blue-400 mb-3"><i class="fab fa-docker mr-2"></i>Podman Basics</h4>
                        <div class="code-block">
                            <code>
<span class="comment"># Image management</span>
podman pull registry.redhat.io/ubi8/ubi
podman images            <span class="comment"># list images</span>
podman rmi image-id      <span class="comment"># remove image</span>
podman search nginx      <span class="comment"># search registry</span>

<span class="comment"># Run containers</span>
podman run -d --name web -p 8080:80 nginx
podman run -it ubi8 /bin/bash
podman run --rm image    <span class="comment"># auto-remove on exit</span>

<span class="comment"># Container management</span>
podman ps                <span class="comment"># running containers</span>
podman ps -a             <span class="comment"># all containers</span>
podman stop container
podman start container
podman rm container
                            </code>
                        </div>
                    </div>

                    <div class="cheat-sheet-card p-4 rounded-xl">
                        <h4 class="font-semibold text-green-400 mb-3"><i class="fas fa-hdd mr-2"></i>Volumes & Networking</h4>
                        <div class="code-block">
                            <code>
<span class="comment"># Volumes</span>
podman run -v /host:/container:Z nginx
podman volume create myvol
podman volume ls
podman run -v myvol:/data nginx

<span class="comment"># Port mapping</span>
podman run -p 8080:80 nginx     <span class="comment"># host:container</span>
podman run -p 127.0.0.1:8080:80 nginx

<span class="comment"># Environment variables</span>
podman run -e VAR=value nginx
podman run --env-file=./env nginx

<span class="comment"># Inspect</span>
podman inspect container
podman logs container
podman exec -it container /bin/bash
                            </code>
                        </div>
                    </div>

                    <div class="cheat-sheet-card p-4 rounded-xl">
                        <h4 class="font-semibold text-purple-400 mb-3"><i class="fas fa-cogs mr-2"></i>Rootless & Systemd</h4>
                        <div class="code-block">
                            <code>
<span class="comment"># Rootless containers (as user)</span>
podman run -d --name myapp nginx
podman generate systemd --new --name myapp > ~/.config/systemd/user/myapp.service

<span class="comment"># Enable user service</span>
systemctl --user daemon-reload
systemctl --user enable --now myapp
loginctl enable-linger username

<span class="comment"># Root containers with systemd</span>
podman generate systemd --new --name myapp > /etc/systemd/system/myapp.service
systemctl daemon-reload
systemctl enable --now myapp
                            </code>
                        </div>
                    </div>

                    <div class="cheat-sheet-card p-4 rounded-xl">
                        <h4 class="font-semibold text-orange-400 mb-3"><i class="fas fa-file-code mr-2"></i>Containerfile/Dockerfile</h4>
                        <div class="code-block">
                            <code>
<span class="comment"># Basic Containerfile</span>
FROM registry.redhat.io/ubi8/ubi
RUN dnf install -y httpd && dnf clean all
COPY index.html /var/www/html/
EXPOSE 80
CMD ["httpd", "-DFOREGROUND"]

<span class="comment"># Build image</span>
podman build -t myimage:v1 .
podman build -f Containerfile -t myimage .

<span class="comment"># Push to registry</span>
podman login registry.example.com
podman push myimage:v1 registry.example.com/myimage:v1
                            </code>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Tab Content: Automation -->
            <div id="tab-automation" class="tab-content">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="cheat-sheet-card p-4 rounded-xl">
                        <h4 class="font-semibold text-blue-400 mb-3"><i class="fas fa-robot mr-2"></i>Ansible Basics</h4>
                        <div class="code-block">
                            <code>
<span class="comment"># Inventory (/etc/ansible/hosts)</span>
[webservers]
web1.example.com
web2.example.com

[dbservers]
db1.example.com

<span class="comment"># Ad-hoc commands</span>
ansible all -m ping
ansible webservers -m shell -a "uptime"
ansible all -m copy -a "src=/tmp/file dest=/tmp/file"
ansible all -m yum -a "name=httpd state=present" -b

<span class="comment"># Options</span>
-i inventory.ini         <span class="comment"># custom inventory</span>
-b                       <span class="comment"># become (sudo)</span>
-K                       <span class="comment"># ask sudo password</span>
                            </code>
                        </div>
                    </div>

                    <div class="cheat-sheet-card p-4 rounded-xl">
                        <h4 class="font-semibold text-green-400 mb-3"><i class="fas fa-file-code mr-2"></i>Ansible Playbooks</h4>
                        <div class="code-block">
                            <code>
<span class="comment"># playbook.yml</span>
---
- name: Configure web servers
  hosts: webservers
  become: yes
  vars:
    http_port: 80
  tasks:
    - name: Install httpd
      yum:
        name: httpd
        state: present
    
    - name: Start httpd
      service:
        name: httpd
        state: started
        enabled: yes
    
    - name: Copy config
      template:
        src: httpd.conf.j2
        dest: /etc/httpd/conf/httpd.conf
      notify: Restart httpd
  
  handlers:
    - name: Restart httpd
      service:
        name: httpd
        state: restarted
                            </code>
                        </div>
                    </div>

                    <div class="cheat-sheet-card p-4 rounded-xl">
                        <h4 class="font-semibold text-purple-400 mb-3"><i class="fas fa-clock mr-2"></i>Cron & At Jobs</h4>
                        <div class="code-block">
                            <code>
<span class="comment"># Cron format</span>
MIN HOUR DOM MON DOW command
0   2    *   *   *   /backup.sh   <span class="comment"># 2am daily</span>
*/5 *    *   *   *   /check.sh    <span class="comment"># every 5 min</span>
0   0    1   *   *   /monthly.sh  <span class="comment"># 1st of month</span>

<span class="comment"># Cron directories</span>
/etc/cron.d/            <span class="comment"># system crons</span>
/etc/cron.daily/        <span class="comment"># daily scripts</span>
/etc/cron.hourly/       <span class="comment"># hourly scripts</span>

<span class="comment"># At jobs (one-time)</span>
at now + 5 minutes
at 2:00 AM tomorrow
at> /path/to/script.sh
at> Ctrl+D

atq                      <span class="comment"># list jobs</span>
atrm job-id              <span class="comment"># remove job</span>
                            </code>
                        </div>
                    </div>

                    <div class="cheat-sheet-card p-4 rounded-xl">
                        <h4 class="font-semibold text-orange-400 mb-3"><i class="fas fa-scroll mr-2"></i>Shell Scripting</h4>
                        <div class="code-block">
                            <code>
<span class="comment">#!/bin/bash</span>
<span class="comment"># Script template</span>

<span class="comment"># Variables</span>
VAR="value"
echo "$VAR"

<span class="comment"># Conditionals</span>
if [ -f "/path/file" ]; then
    echo "File exists"
elif [ -d "/path/dir" ]; then
    echo "Dir exists"
else
    echo "Not found"
fi

<span class="comment"># Loops</span>
for i in 1 2 3; do echo $i; done
for f in *.txt; do cat $f; done
while read line; do echo $line; done < file

<span class="comment"># Functions</span>
my_func() { echo "Hello $1"; }
my_func "World"
                            </code>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Initialize tabs after loading content
    initTabs();
    
    // Load more cheat sheet sections
    loadOracleCheatSheet();
    loadFlowOneCheatSheet();
    loadShellScriptingCheatSheet();
    loadJavaOOPCheatSheet();
}

/**
 * Initialize tab functionality
 */
function initTabs() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.dataset.tab;
            const container = btn.closest('.bg-secondary');
            
            // Update tab buttons
            container.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Update tab content
            container.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            container.querySelector(`#tab-${tabId}`).classList.add('active');
        });
    });
}

/**
 * Load Oracle Admin Cheat Sheet - Comprehensive for OCA/OCP Certification
 */
function loadOracleCheatSheet() {
    const section = document.createElement('section');
    section.id = 'oracle-admin';
    section.className = 'mb-12 scroll-mt-8';
    section.innerHTML = `
        <div class="bg-secondary rounded-2xl p-6 shadow-xl">
            <h2 class="text-2xl font-bold mb-6 flex items-center">
                <i class="fas fa-database mr-3 text-red-400"></i>Oracle Admin Cheat Sheet - Operations & Performance
            </h2>
            <p class="text-gray-400 mb-4">Comprehensive guide for Oracle Database Administration certification</p>
            
            <!-- Tab Navigation -->
            <div class="tab-container flex-wrap mb-6">
                <button class="tab-btn active" data-tab="ora-basics">SQL*Plus & Startup</button>
                <button class="tab-btn" data-tab="ora-users">Users & Security</button>
                <button class="tab-btn" data-tab="ora-storage">Storage & Tablespaces</button>
                <button class="tab-btn" data-tab="ora-backup">Backup & Recovery</button>
                <button class="tab-btn" data-tab="ora-performance">Performance Tuning</button>
                <button class="tab-btn" data-tab="ora-network">Network & Listener</button>
                <button class="tab-btn" data-tab="ora-maintenance">Maintenance</button>
            </div>

            <!-- SQL*Plus & Startup -->
            <div id="tab-ora-basics" class="tab-content active">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="cheat-sheet-card p-4 rounded-xl">
                        <h4 class="font-semibold text-blue-400 mb-3"><i class="fas fa-terminal mr-2"></i>SQL*Plus Connection</h4>
                        <div class="code-block">
                            <code>
<span class="comment">-- Local connection</span>
sqlplus / as sysdba
sqlplus sys/password as sysdba
sqlplus system/password

<span class="comment">-- Remote connection</span>
sqlplus user/pass@//host:1521/service
sqlplus user/pass@TNS_ALIAS

<span class="comment">-- Formatting output</span>
SET LINESIZE 200
SET PAGESIZE 50
SET COLSEP '|'
COLUMN column_name FORMAT A30
COLUMN num_col FORMAT 999,999,999

<span class="comment">-- Run script</span>
@/path/to/script.sql
START script.sql
                            </code>
                        </div>
                    </div>

                    <div class="cheat-sheet-card p-4 rounded-xl">
                        <h4 class="font-semibold text-green-400 mb-3"><i class="fas fa-power-off mr-2"></i>Startup & Shutdown</h4>
                        <div class="code-block">
                            <code>
<span class="comment">-- Startup stages</span>
STARTUP NOMOUNT;     <span class="comment">-- Read spfile/pfile only</span>
ALTER DATABASE MOUNT;  <span class="comment">-- Read control file</span>
ALTER DATABASE OPEN;   <span class="comment">-- Open datafiles</span>

<span class="comment">-- Direct startup</span>
STARTUP;             <span class="comment">-- Full startup</span>
STARTUP FORCE;       <span class="comment">-- Abort + Start</span>
STARTUP RESTRICT;    <span class="comment">-- Admin only</span>
STARTUP UPGRADE;     <span class="comment">-- For upgrades</span>

<span class="comment">-- Shutdown modes</span>
SHUTDOWN NORMAL;     <span class="comment">-- Wait for sessions</span>
SHUTDOWN TRANSACTIONAL; <span class="comment">-- Wait for txns</span>
SHUTDOWN IMMEDIATE;  <span class="comment">-- Rollback & close</span>
SHUTDOWN ABORT;      <span class="comment">-- Emergency (no cleanup)</span>
                            </code>
                        </div>
                    </div>

                    <div class="cheat-sheet-card p-4 rounded-xl">
                        <h4 class="font-semibold text-purple-400 mb-3"><i class="fas fa-info-circle mr-2"></i>Instance Information</h4>
                        <div class="code-block">
                            <code>
<span class="comment">-- Database status</span>
SELECT STATUS FROM V$INSTANCE;
SELECT NAME, OPEN_MODE, LOG_MODE FROM V$DATABASE;
SELECT INSTANCE_NAME, HOST_NAME FROM V$INSTANCE;

<span class="comment">-- Version info</span>
SELECT * FROM V$VERSION;
SELECT BANNER FROM V$VERSION WHERE ROWNUM=1;

<span class="comment">-- Parameter file location</span>
SHOW PARAMETER spfile;
SHOW PARAMETER pfile;

<span class="comment">-- All parameters</span>
SHOW PARAMETERS;
SELECT NAME, VALUE FROM V$PARAMETER WHERE ISMODIFIED='MODIFIED';
                            </code>
                        </div>
                    </div>

                    <div class="cheat-sheet-card p-4 rounded-xl">
                        <h4 class="font-semibold text-orange-400 mb-3"><i class="fas fa-cog mr-2"></i>Parameter Management</h4>
                        <div class="code-block">
                            <code>
<span class="comment">-- View parameters</span>
SHOW PARAMETER parameter_name;
SELECT NAME, VALUE, ISDEFAULT FROM V$PARAMETER;

<span class="comment">-- Modify parameters (dynamic)</span>
ALTER SYSTEM SET param=value SCOPE=MEMORY;  <span class="comment">-- Session only</span>
ALTER SYSTEM SET param=value SCOPE=SPFILE;  <span class="comment">-- After restart</span>
ALTER SYSTEM SET param=value SCOPE=BOTH;    <span class="comment">-- Immediate + persist</span>

<span class="comment">-- Session level</span>
ALTER SESSION SET param=value;

<span class="comment">-- Create pfile from spfile</span>
CREATE PFILE='/path/pfile.ora' FROM SPFILE;
CREATE SPFILE FROM PFILE='/path/pfile.ora';
                            </code>
                        </div>
                    </div>
                </div>
                <div class="memory-card mt-6">
                    <h4><i class="fas fa-brain mr-2"></i>Memory Aid: Startup Stages</h4>
                    <p class="mnemonic">SHUTDOWN → NOMOUNT (spfile) → MOUNT (control) → OPEN (datafiles)</p>
                </div>
            </div>

            <!-- Users & Security -->
            <div id="tab-ora-users" class="tab-content">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="cheat-sheet-card p-4 rounded-xl">
                        <h4 class="font-semibold text-blue-400 mb-3"><i class="fas fa-user-plus mr-2"></i>User Management</h4>
                        <div class="code-block">
                            <code>
<span class="comment">-- Create user</span>
CREATE USER username IDENTIFIED BY password
DEFAULT TABLESPACE users
TEMPORARY TABLESPACE temp
QUOTA 100M ON users;

<span class="comment">-- Modify user</span>
ALTER USER username IDENTIFIED BY newpass;
ALTER USER username QUOTA UNLIMITED ON users;
ALTER USER username ACCOUNT LOCK;
ALTER USER username ACCOUNT UNLOCK;
ALTER USER username PASSWORD EXPIRE;

<span class="comment">-- Drop user</span>
DROP USER username CASCADE;  <span class="comment">-- With objects</span>
                            </code>
                        </div>
                    </div>

                    <div class="cheat-sheet-card p-4 rounded-xl">
                        <h4 class="font-semibold text-green-400 mb-3"><i class="fas fa-key mr-2"></i>Privileges & Roles</h4>
                        <div class="code-block">
                            <code>
<span class="comment">-- System privileges</span>
GRANT CREATE SESSION TO user;
GRANT CREATE TABLE TO user;
GRANT CREATE ANY TABLE TO user;
GRANT UNLIMITED TABLESPACE TO user;

<span class="comment">-- Object privileges</span>
GRANT SELECT, INSERT, UPDATE ON schema.table TO user;
GRANT EXECUTE ON schema.procedure TO user;
GRANT ALL ON schema.table TO user;

<span class="comment">-- Roles</span>
CREATE ROLE role_name;
GRANT SELECT ON table TO role_name;
GRANT role_name TO user;
GRANT CONNECT, RESOURCE, DBA TO user;

<span class="comment">-- Revoke</span>
REVOKE privilege FROM user;
                            </code>
                        </div>
                    </div>

                    <div class="cheat-sheet-card p-4 rounded-xl">
                        <h4 class="font-semibold text-purple-400 mb-3"><i class="fas fa-shield-alt mr-2"></i>Profiles & Auditing</h4>
                        <div class="code-block">
                            <code>
<span class="comment">-- Create profile</span>
CREATE PROFILE secure_profile LIMIT
  SESSIONS_PER_USER 3
  FAILED_LOGIN_ATTEMPTS 3
  PASSWORD_LOCK_TIME 1
  PASSWORD_LIFE_TIME 90
  PASSWORD_GRACE_TIME 7;

<span class="comment">-- Assign profile</span>
ALTER USER username PROFILE secure_profile;

<span class="comment">-- Auditing</span>
AUDIT SELECT ON schema.table BY ACCESS;
AUDIT CREATE SESSION BY username;
NOAUDIT SELECT ON schema.table;

<span class="comment">-- View audit trail</span>
SELECT * FROM DBA_AUDIT_TRAIL;
                            </code>
                        </div>
                    </div>

                    <div class="cheat-sheet-card p-4 rounded-xl">
                        <h4 class="font-semibold text-orange-400 mb-3"><i class="fas fa-search mr-2"></i>Query User Info</h4>
                        <div class="code-block">
                            <code>
<span class="comment">-- List users</span>
SELECT USERNAME, ACCOUNT_STATUS, CREATED FROM DBA_USERS;

<span class="comment">-- User privileges</span>
SELECT * FROM DBA_SYS_PRIVS WHERE GRANTEE='USER';
SELECT * FROM DBA_TAB_PRIVS WHERE GRANTEE='USER';
SELECT * FROM DBA_ROLE_PRIVS WHERE GRANTEE='USER';

<span class="comment">-- User quotas</span>
SELECT * FROM DBA_TS_QUOTAS WHERE USERNAME='USER';

<span class="comment">-- Currently connected users</span>
SELECT USERNAME, SID, SERIAL#, STATUS 
FROM V$SESSION WHERE TYPE='USER';
                            </code>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Storage & Tablespaces -->
            <div id="tab-ora-storage" class="tab-content">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="cheat-sheet-card p-4 rounded-xl">
                        <h4 class="font-semibold text-blue-400 mb-3"><i class="fas fa-hdd mr-2"></i>Tablespace Management</h4>
                        <div class="code-block">
                            <code>
<span class="comment">-- Create tablespace</span>
CREATE TABLESPACE ts_data
DATAFILE '/u01/oradata/ts_data01.dbf' SIZE 500M
AUTOEXTEND ON NEXT 100M MAXSIZE 10G
EXTENT MANAGEMENT LOCAL
SEGMENT SPACE MANAGEMENT AUTO;

<span class="comment">-- Add datafile</span>
ALTER TABLESPACE ts_data 
ADD DATAFILE '/u01/oradata/ts_data02.dbf' SIZE 500M;

<span class="comment">-- Resize datafile</span>
ALTER DATABASE DATAFILE '/path/file.dbf' RESIZE 1G;

<span class="comment">-- Drop tablespace</span>
DROP TABLESPACE ts_name INCLUDING CONTENTS AND DATAFILES;
                            </code>
                        </div>
                    </div>

                    <div class="cheat-sheet-card p-4 rounded-xl">
                        <h4 class="font-semibold text-green-400 mb-3"><i class="fas fa-chart-pie mr-2"></i>Space Monitoring</h4>
                        <div class="code-block">
                            <code>
<span class="comment">-- Tablespace usage</span>
SELECT TABLESPACE_NAME,
  ROUND(USED_SPACE * 8192 / 1024 / 1024) USED_MB,
  ROUND(TABLESPACE_SIZE * 8192 / 1024 / 1024) TOTAL_MB,
  ROUND(USED_PERCENT, 2) USED_PCT
FROM DBA_TABLESPACE_USAGE_METRICS;

<span class="comment">-- Datafile sizes</span>
SELECT FILE_NAME, TABLESPACE_NAME,
  BYTES/1024/1024 SIZE_MB,
  AUTOEXTENSIBLE
FROM DBA_DATA_FILES;

<span class="comment">-- Free space</span>
SELECT TABLESPACE_NAME, SUM(BYTES)/1024/1024 FREE_MB
FROM DBA_FREE_SPACE GROUP BY TABLESPACE_NAME;
                            </code>
                        </div>
                    </div>

                    <div class="cheat-sheet-card p-4 rounded-xl">
                        <h4 class="font-semibold text-purple-400 mb-3"><i class="fas fa-undo mr-2"></i>Undo & Temp</h4>
                        <div class="code-block">
                            <code>
<span class="comment">-- Undo tablespace</span>
CREATE UNDO TABLESPACE undotbs2
DATAFILE '/u01/oradata/undotbs2.dbf' SIZE 500M;

ALTER SYSTEM SET UNDO_TABLESPACE=undotbs2;
ALTER SYSTEM SET UNDO_RETENTION=900;

<span class="comment">-- Temp tablespace</span>
CREATE TEMPORARY TABLESPACE temp2
TEMPFILE '/u01/oradata/temp02.dbf' SIZE 500M;

ALTER DATABASE DEFAULT TEMPORARY TABLESPACE temp2;

<span class="comment">-- Monitor undo</span>
SELECT * FROM V$UNDOSTAT;
SELECT TABLESPACE_NAME, STATUS FROM DBA_ROLLBACK_SEGS;
                            </code>
                        </div>
                    </div>

                    <div class="cheat-sheet-card p-4 rounded-xl">
                        <h4 class="font-semibold text-orange-400 mb-3"><i class="fas fa-file-alt mr-2"></i>Redo Logs</h4>
                        <div class="code-block">
                            <code>
<span class="comment">-- View redo logs</span>
SELECT GROUP#, MEMBERS, BYTES/1024/1024 MB, STATUS
FROM V$LOG;

SELECT GROUP#, MEMBER FROM V$LOGFILE;

<span class="comment">-- Add redo log group</span>
ALTER DATABASE ADD LOGFILE GROUP 4 
  ('/u01/oradata/redo04.log') SIZE 100M;

<span class="comment">-- Switch & checkpoint</span>
ALTER SYSTEM SWITCH LOGFILE;
ALTER SYSTEM CHECKPOINT;

<span class="comment">-- Archive log mode</span>
ARCHIVE LOG LIST;
ALTER DATABASE ARCHIVELOG;
                            </code>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Backup & Recovery -->
            <div id="tab-ora-backup" class="tab-content">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="cheat-sheet-card p-4 rounded-xl">
                        <h4 class="font-semibold text-blue-400 mb-3"><i class="fas fa-save mr-2"></i>RMAN Basics</h4>
                        <div class="code-block">
                            <code>
<span class="comment">-- Connect to RMAN</span>
rman target /
rman target sys/password@SID

<span class="comment">-- Full database backup</span>
RMAN> BACKUP DATABASE PLUS ARCHIVELOG;

<span class="comment">-- Backup specific tablespace</span>
RMAN> BACKUP TABLESPACE users;

<span class="comment">-- Backup datafile</span>
RMAN> BACKUP DATAFILE '/path/file.dbf';

<span class="comment">-- Incremental backup</span>
RMAN> BACKUP INCREMENTAL LEVEL 0 DATABASE;  <span class="comment">-- Base</span>
RMAN> BACKUP INCREMENTAL LEVEL 1 DATABASE;  <span class="comment">-- Diff</span>
                            </code>
                        </div>
                    </div>

                    <div class="cheat-sheet-card p-4 rounded-xl">
                        <h4 class="font-semibold text-green-400 mb-3"><i class="fas fa-redo mr-2"></i>Recovery</h4>
                        <div class="code-block">
                            <code>
<span class="comment">-- Recover database</span>
RMAN> RESTORE DATABASE;
RMAN> RECOVER DATABASE;
RMAN> ALTER DATABASE OPEN RESETLOGS;

<span class="comment">-- Recover tablespace</span>
RMAN> SQL 'ALTER TABLESPACE users OFFLINE';
RMAN> RESTORE TABLESPACE users;
RMAN> RECOVER TABLESPACE users;
RMAN> SQL 'ALTER TABLESPACE users ONLINE';

<span class="comment">-- Point-in-time recovery</span>
RMAN> RUN {
  SET UNTIL TIME "TO_DATE('2024-01-15 10:00:00','YYYY-MM-DD HH24:MI:SS')";
  RESTORE DATABASE;
  RECOVER DATABASE;
}
                            </code>
                        </div>
                    </div>

                    <div class="cheat-sheet-card p-4 rounded-xl">
                        <h4 class="font-semibold text-purple-400 mb-3"><i class="fas fa-list mr-2"></i>RMAN Reports</h4>
                        <div class="code-block">
                            <code>
<span class="comment">-- List backups</span>
RMAN> LIST BACKUP;
RMAN> LIST BACKUP OF DATABASE;
RMAN> LIST BACKUP OF TABLESPACE users;

<span class="comment">-- Report obsolete</span>
RMAN> REPORT OBSOLETE;
RMAN> DELETE OBSOLETE;

<span class="comment">-- Crosscheck</span>
RMAN> CROSSCHECK BACKUP;
RMAN> DELETE EXPIRED BACKUP;

<span class="comment">-- Configure retention</span>
RMAN> CONFIGURE RETENTION POLICY TO RECOVERY WINDOW OF 7 DAYS;
RMAN> SHOW ALL;
                            </code>
                        </div>
                    </div>

                    <div class="cheat-sheet-card p-4 rounded-xl">
                        <h4 class="font-semibold text-orange-400 mb-3"><i class="fas fa-database mr-2"></i>Data Pump</h4>
                        <div class="code-block">
                            <code>
<span class="comment">-- Export schema</span>
expdp user/pass SCHEMAS=schema DIRECTORY=dp_dir DUMPFILE=exp.dmp LOGFILE=exp.log

<span class="comment">-- Export tables</span>
expdp user/pass TABLES=tab1,tab2 DIRECTORY=dp_dir DUMPFILE=exp.dmp

<span class="comment">-- Import schema</span>
impdp user/pass SCHEMAS=schema DIRECTORY=dp_dir DUMPFILE=exp.dmp REMAP_SCHEMA=old:new

<span class="comment">-- Create directory</span>
CREATE DIRECTORY dp_dir AS '/u01/export';
GRANT READ, WRITE ON DIRECTORY dp_dir TO user;
                            </code>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Performance Tuning -->
            <div id="tab-ora-performance" class="tab-content">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="cheat-sheet-card p-4 rounded-xl">
                        <h4 class="font-semibold text-blue-400 mb-3"><i class="fas fa-tachometer-alt mr-2"></i>Session Monitoring</h4>
                        <div class="code-block">
                            <code>
<span class="comment">-- Active sessions</span>
SELECT SID, SERIAL#, USERNAME, STATUS, 
  PROGRAM, MACHINE, SQL_ID
FROM V$SESSION 
WHERE STATUS = 'ACTIVE' AND TYPE = 'USER';

<span class="comment">-- Session wait events</span>
SELECT SID, EVENT, WAIT_CLASS, SECONDS_IN_WAIT
FROM V$SESSION WHERE WAIT_CLASS != 'Idle';

<span class="comment">-- Kill session</span>
ALTER SYSTEM KILL SESSION 'sid,serial#' IMMEDIATE;
ALTER SYSTEM DISCONNECT SESSION 'sid,serial#' POST_TRANSACTION;

<span class="comment">-- Session SQL</span>
SELECT SQL_TEXT FROM V$SQL 
WHERE SQL_ID = (SELECT SQL_ID FROM V$SESSION WHERE SID=123);
                            </code>
                        </div>
                    </div>

                    <div class="cheat-sheet-card p-4 rounded-xl">
                        <h4 class="font-semibold text-green-400 mb-3"><i class="fas fa-chart-line mr-2"></i>SQL Performance</h4>
                        <div class="code-block">
                            <code>
<span class="comment">-- Top SQL by elapsed time</span>
SELECT SQL_ID, ELAPSED_TIME/1000000 SECS, EXECUTIONS,
  BUFFER_GETS, DISK_READS
FROM V$SQL ORDER BY ELAPSED_TIME DESC
FETCH FIRST 10 ROWS ONLY;

<span class="comment">-- Explain plan</span>
EXPLAIN PLAN FOR SELECT * FROM table WHERE col=1;
SELECT * FROM TABLE(DBMS_XPLAN.DISPLAY);

<span class="comment">-- SQL execution plan</span>
SELECT * FROM TABLE(DBMS_XPLAN.DISPLAY_CURSOR('sql_id'));

<span class="comment">-- Gather statistics</span>
EXEC DBMS_STATS.GATHER_TABLE_STATS('SCHEMA','TABLE');
EXEC DBMS_STATS.GATHER_SCHEMA_STATS('SCHEMA');
                            </code>
                        </div>
                    </div>

                    <div class="cheat-sheet-card p-4 rounded-xl">
                        <h4 class="font-semibold text-purple-400 mb-3"><i class="fas fa-memory mr-2"></i>Memory Management</h4>
                        <div class="code-block">
                            <code>
<span class="comment">-- SGA components</span>
SELECT * FROM V$SGA;
SELECT COMPONENT, CURRENT_SIZE/1024/1024 MB FROM V$SGA_DYNAMIC_COMPONENTS;

<span class="comment">-- PGA stats</span>
SELECT * FROM V$PGASTAT;

<span class="comment">-- Buffer cache hit ratio</span>
SELECT 1 - (physical.value / (db_block_gets.value + consistent_gets.value)) AS HIT_RATIO
FROM V$SYSSTAT physical, V$SYSSTAT db_block_gets, V$SYSSTAT consistent_gets
WHERE physical.name = 'physical reads'
AND db_block_gets.name = 'db block gets'
AND consistent_gets.name = 'consistent gets';

<span class="comment">-- Memory parameters</span>
SHOW PARAMETER memory_target;
SHOW PARAMETER sga_target;
SHOW PARAMETER pga_aggregate_target;
                            </code>
                        </div>
                    </div>

                    <div class="cheat-sheet-card p-4 rounded-xl">
                        <h4 class="font-semibold text-orange-400 mb-3"><i class="fas fa-lock mr-2"></i>Locks & Blocking</h4>
                        <div class="code-block">
                            <code>
<span class="comment">-- View locks</span>
SELECT L.SID, S.SERIAL#, S.USERNAME, L.TYPE, L.MODE_HELD
FROM DBA_LOCKS L, V$SESSION S
WHERE L.SESSION_ID = S.SID AND L.LOCK_TYPE = 'Transaction';

<span class="comment">-- Blocking sessions</span>
SELECT S1.SID BLOCKER_SID, S2.SID BLOCKED_SID,
  S1.USERNAME BLOCKER, S2.USERNAME BLOCKED
FROM V$SESSION S1, V$SESSION S2
WHERE S1.SID = S2.BLOCKING_SESSION;

<span class="comment">-- DML locks on objects</span>
SELECT O.OBJECT_NAME, S.SID, S.SERIAL#, L.LOCKED_MODE
FROM V$LOCKED_OBJECT L, DBA_OBJECTS O, V$SESSION S
WHERE L.OBJECT_ID = O.OBJECT_ID AND L.SESSION_ID = S.SID;
                            </code>
                        </div>
                    </div>
                </div>
                <div class="memory-card mt-6">
                    <h4><i class="fas fa-brain mr-2"></i>Memory Aid: V$ Views</h4>
                    <p class="mnemonic">V$SESSION → V$SQL → V$SQLAREA → V$LOCK → V$SYSSTAT</p>
                </div>
            </div>

            <!-- Network & Listener -->
            <div id="tab-ora-network" class="tab-content">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="cheat-sheet-card p-4 rounded-xl">
                        <h4 class="font-semibold text-blue-400 mb-3"><i class="fas fa-network-wired mr-2"></i>Listener Control</h4>
                        <div class="code-block">
                            <code>
<span class="comment"># Listener commands</span>
lsnrctl status
lsnrctl start
lsnrctl stop
lsnrctl reload
lsnrctl services

<span class="comment"># Check specific listener</span>
lsnrctl status LISTENER_NAME

<span class="comment"># Test connection</span>
tnsping SID_ALIAS
tnsping //hostname:1521/service_name
                            </code>
                        </div>
                    </div>

                    <div class="cheat-sheet-card p-4 rounded-xl">
                        <h4 class="font-semibold text-green-400 mb-3"><i class="fas fa-file-alt mr-2"></i>listener.ora</h4>
                        <div class="code-block">
                            <code>
<span class="comment"># $ORACLE_HOME/network/admin/listener.ora</span>
LISTENER =
  (DESCRIPTION =
    (ADDRESS = (PROTOCOL = TCP)
               (HOST = hostname)
               (PORT = 1521))
  )

SID_LIST_LISTENER =
  (SID_LIST =
    (SID_DESC =
      (GLOBAL_DBNAME = ORCL)
      (ORACLE_HOME = /u01/app/oracle/product/19c)
      (SID_NAME = ORCL)
    )
  )
                            </code>
                        </div>
                    </div>

                    <div class="cheat-sheet-card p-4 rounded-xl">
                        <h4 class="font-semibold text-purple-400 mb-3"><i class="fas fa-plug mr-2"></i>tnsnames.ora</h4>
                        <div class="code-block">
                            <code>
<span class="comment"># $ORACLE_HOME/network/admin/tnsnames.ora</span>
ORCL =
  (DESCRIPTION =
    (ADDRESS = (PROTOCOL = TCP)
               (HOST = hostname)
               (PORT = 1521))
    (CONNECT_DATA =
      (SERVER = DEDICATED)
      (SERVICE_NAME = ORCL)
    )
  )

<span class="comment"># Easy Connect (no tnsnames needed)</span>
sqlplus user/pass@//host:1521/service
                            </code>
                        </div>
                    </div>

                    <div class="cheat-sheet-card p-4 rounded-xl">
                        <h4 class="font-semibold text-orange-400 mb-3"><i class="fas fa-link mr-2"></i>Database Links</h4>
                        <div class="code-block">
                            <code>
<span class="comment">-- Create public link</span>
CREATE PUBLIC DATABASE LINK remote_db
CONNECT TO username IDENTIFIED BY password
USING 'TNS_ALIAS';

<span class="comment">-- Create private link</span>
CREATE DATABASE LINK my_link
CONNECT TO user IDENTIFIED BY pass
USING '//host:1521/service';

<span class="comment">-- Use link</span>
SELECT * FROM table@remote_db;
INSERT INTO local_table SELECT * FROM remote_table@remote_db;

<span class="comment">-- Drop link</span>
DROP DATABASE LINK link_name;
                            </code>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Maintenance -->
            <div id="tab-ora-maintenance" class="tab-content">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="cheat-sheet-card p-4 rounded-xl">
                        <h4 class="font-semibold text-blue-400 mb-3"><i class="fas fa-wrench mr-2"></i>Index Management</h4>
                        <div class="code-block">
                            <code>
<span class="comment">-- Create index</span>
CREATE INDEX idx_name ON table(column);
CREATE UNIQUE INDEX idx_unique ON table(col);
CREATE INDEX idx_comp ON table(col1, col2);

<span class="comment">-- Rebuild index</span>
ALTER INDEX idx_name REBUILD;
ALTER INDEX idx_name REBUILD ONLINE;
ALTER INDEX idx_name REBUILD TABLESPACE new_ts;

<span class="comment">-- Monitor index usage</span>
ALTER INDEX idx_name MONITORING USAGE;
SELECT * FROM V$OBJECT_USAGE;

<span class="comment">-- Unusable/valid</span>
ALTER INDEX idx_name UNUSABLE;
ALTER INDEX idx_name REBUILD;
                            </code>
                        </div>
                    </div>

                    <div class="cheat-sheet-card p-4 rounded-xl">
                        <h4 class="font-semibold text-green-400 mb-3"><i class="fas fa-table mr-2"></i>Table Maintenance</h4>
                        <div class="code-block">
                            <code>
<span class="comment">-- Analyze table</span>
EXEC DBMS_STATS.GATHER_TABLE_STATS('SCHEMA','TABLE');

<span class="comment">-- Shrink table (online)</span>
ALTER TABLE table ENABLE ROW MOVEMENT;
ALTER TABLE table SHRINK SPACE;

<span class="comment">-- Move table to new tablespace</span>
ALTER TABLE table MOVE TABLESPACE new_ts;
<span class="comment">-- Rebuild indexes after move!</span>
ALTER INDEX idx REBUILD;

<span class="comment">-- Truncate vs Delete</span>
TRUNCATE TABLE table;  <span class="comment">-- Fast, no rollback</span>
DELETE FROM table;     <span class="comment">-- Slow, can rollback</span>
                            </code>
                        </div>
                    </div>

                    <div class="cheat-sheet-card p-4 rounded-xl">
                        <h4 class="font-semibold text-purple-400 mb-3"><i class="fas fa-broom mr-2"></i>Cleanup & Purge</h4>
                        <div class="code-block">
                            <code>
<span class="comment">-- Purge recycle bin</span>
PURGE RECYCLEBIN;
PURGE DBA_RECYCLEBIN;
PURGE TABLE table_name;

<span class="comment">-- AWR management</span>
SELECT SNAP_ID, BEGIN_INTERVAL_TIME FROM DBA_HIST_SNAPSHOT ORDER BY SNAP_ID DESC;

EXEC DBMS_WORKLOAD_REPOSITORY.DROP_SNAPSHOT_RANGE(
  low_snap_id => 100, high_snap_id => 200);

<span class="comment">-- Audit trail cleanup</span>
DELETE FROM AUD$ WHERE TIMESTAMP < SYSDATE - 90;
TRUNCATE TABLE SYS.AUD$;
                            </code>
                        </div>
                    </div>

                    <div class="cheat-sheet-card p-4 rounded-xl">
                        <h4 class="font-semibold text-orange-400 mb-3"><i class="fas fa-calendar mr-2"></i>Scheduler Jobs</h4>
                        <div class="code-block">
                            <code>
<span class="comment">-- Create job</span>
BEGIN
  DBMS_SCHEDULER.CREATE_JOB (
    job_name        => 'DAILY_BACKUP',
    job_type        => 'PLSQL_BLOCK',
    job_action      => 'BEGIN backup_proc; END;',
    start_date      => SYSTIMESTAMP,
    repeat_interval => 'FREQ=DAILY; BYHOUR=2',
    enabled         => TRUE
  );
END;
/

<span class="comment">-- View jobs</span>
SELECT JOB_NAME, STATE, LAST_RUN_DATE, NEXT_RUN_DATE
FROM DBA_SCHEDULER_JOBS;

<span class="comment">-- Drop job</span>
EXEC DBMS_SCHEDULER.DROP_JOB('JOB_NAME');
                            </code>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.getElementById('linux-admin').after(section);
}

/**
 * Load FlowOne Modules Cheat Sheet
 */
function loadFlowOneCheatSheet() {
    const section = document.createElement('section');
    section.id = 'flowone-modules';
    section.className = 'mb-12 scroll-mt-8';
    section.innerHTML = `
        <div class="bg-secondary rounded-2xl p-6 shadow-xl">
            <h2 class="text-2xl font-bold mb-6 flex items-center">
                <i class="fas fa-cogs mr-3 text-blue-400"></i>FlowOne Modules Cheat Sheet
            </h2>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div class="cheat-sheet-card p-4 rounded-xl border-l-4 border-blue-500">
                    <h4 class="font-semibold text-blue-400 mb-3">Order Management (OM)</h4>
                    <ul class="text-sm space-y-2">
                        <li><i class="fas fa-check text-green-400 mr-2"></i>Order orchestration via CDOM</li>
                        <li><i class="fas fa-check text-green-400 mr-2"></i>Decomposition to RFS/TS</li>
                        <li><i class="fas fa-check text-green-400 mr-2"></i>Jeopardy management</li>
                        <li><i class="fas fa-check text-green-400 mr-2"></i>Order status tracking</li>
                        <li><i class="fas fa-check text-green-400 mr-2"></i>Inflight cancel/modify</li>
                    </ul>
                </div>

                <div class="cheat-sheet-card p-4 rounded-xl border-l-4 border-green-500">
                    <h4 class="font-semibold text-green-400 mb-3">Provisioning & Activation (P&A)</h4>
                    <ul class="text-sm space-y-2">
                        <li><i class="fas fa-check text-green-400 mr-2"></i>NEI communication (EMS)</li>
                        <li><i class="fas fa-check text-green-400 mr-2"></i>TL1/SOAP/REST adapters</li>
                        <li><i class="fas fa-check text-green-400 mr-2"></i>Task execution</li>
                        <li><i class="fas fa-check text-green-400 mr-2"></i>Response handling</li>
                        <li><i class="fas fa-check text-green-400 mr-2"></i>Rollback execution</li>
                    </ul>
                </div>

                <div class="cheat-sheet-card p-4 rounded-xl border-l-4 border-purple-500">
                    <h4 class="font-semibold text-purple-400 mb-3">Service Catalog</h4>
                    <ul class="text-sm space-y-2">
                        <li><i class="fas fa-check text-green-400 mr-2"></i>CFS/RFS/TS definitions</li>
                        <li><i class="fas fa-check text-green-400 mr-2"></i>Lifecycle management</li>
                        <li><i class="fas fa-check text-green-400 mr-2"></i>Version control</li>
                        <li><i class="fas fa-check text-green-400 mr-2"></i>State transitions</li>
                        <li><i class="fas fa-check text-green-400 mr-2"></i>Parameter specifications</li>
                    </ul>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="cheat-sheet-card p-4 rounded-xl">
                    <h4 class="font-semibold text-yellow-400 mb-3"><i class="fas fa-tasks mr-2"></i>Order Hub (OH)</h4>
                    <ul class="text-sm space-y-2">
                        <li><i class="fas fa-arrow-right text-blue-400 mr-2"></i>Manual task management UI</li>
                        <li><i class="fas fa-arrow-right text-blue-400 mr-2"></i>Fallout handling forms</li>
                        <li><i class="fas fa-arrow-right text-blue-400 mr-2"></i>Parameter editing for retry</li>
                        <li><i class="fas fa-arrow-right text-blue-400 mr-2"></i>Work item assignment</li>
                        <li><i class="fas fa-arrow-right text-blue-400 mr-2"></i>Advanced config tasks (SHDSL, P2P)</li>
                    </ul>
                </div>

                <div class="cheat-sheet-card p-4 rounded-xl">
                    <h4 class="font-semibold text-cyan-400 mb-3"><i class="fas fa-book mr-2"></i>Logic Library (LL)</h4>
                    <ul class="text-sm space-y-2">
                        <li><i class="fas fa-arrow-right text-blue-400 mr-2"></i>Validation rules (TL_Validation)</li>
                        <li><i class="fas fa-arrow-right text-blue-400 mr-2"></i>Business logic execution</li>
                        <li><i class="fas fa-arrow-right text-blue-400 mr-2"></i>Data transformation</li>
                        <li><i class="fas fa-arrow-right text-blue-400 mr-2"></i>Error handling logic</li>
                        <li><i class="fas fa-arrow-right text-blue-400 mr-2"></i>Custom fallout handlers</li>
                    </ul>
                </div>
            </div>

            <div class="memory-card mt-6">
                <h4><i class="fas fa-brain mr-2"></i>Memory Aid: FlowOne Flow</h4>
                <p class="mnemonic">NB → OM → Catalog → P&A → NEI → VC4</p>
                <p class="text-sm text-gray-400 mt-2">Northbound request → Order decomposed via Catalog → P&A provisions → Network configured → Inventory updated</p>
            </div>
        </div>
    `;
    document.getElementById('oracle-admin').after(section);
}

/**
 * Load Shell Scripting Cheat Sheet - Nokia FlowOne Scripting
 */
function loadShellScriptingCheatSheet() {
    const section = document.createElement('section');
    section.id = 'shell-scripting';
    section.className = 'mb-12 scroll-mt-8';
    section.innerHTML = `
        <div class="bg-secondary rounded-2xl p-6 shadow-xl">
            <h2 class="text-2xl font-bold mb-6 flex items-center">
                <i class="fas fa-terminal mr-3 text-green-400"></i>Shell Scripting & Nokia FlowOne Scripting
            </h2>
            
            <!-- Tab Navigation -->
            <div class="tab-container mb-6">
                <button class="tab-btn active" data-tab="tl-explained">Nokia's TL Scripting</button>
                <button class="tab-btn" data-tab="fo-scripting">FlowOne Scripting</button>
                <button class="tab-btn" data-tab="soap-testing">SOAP Testing</button>
                <button class="tab-btn" data-tab="curl-telecom">cURL Telecom</button>
                <button class="tab-btn" data-tab="bash-basics">Bash Basics</button>
            </div>

            <!-- Nokia's TL Scripting Explained Tab -->
            <div id="tab-tl-explained" class="tab-content active">
                <div class="space-y-6">
                    <!-- What It Does -->
                    <div class="bg-primary rounded-xl p-4">
                        <h3 class="font-semibold text-blue-400 mb-3"><i class="fas fa-info-circle mr-2"></i>What Is TL Scripting?</h3>
                        <p class="text-gray-300 mb-3">Nokia FlowOne uses <strong>TL (Task Logic)</strong> scripting, which is built on <strong>Groovy</strong> (a Java-like language). TL scripts are the "brain" of each task in FlowOne.</p>
                        <p class="text-gray-400">Every time an order needs to <strong>Validate</strong> inputs, <strong>Call</strong> an external system (VC4, EMS), <strong>Transform</strong> data, or <strong>Handle</strong> errors... a TL script runs.</p>
                    </div>

                    <!-- Basic Structure -->
                    <div class="bg-primary rounded-xl p-4">
                        <h3 class="font-semibold text-green-400 mb-3"><i class="fas fa-layer-group mr-2"></i>Basic Structure</h3>
                        <p class="text-gray-400 mb-3">Every TL script has 3 parts:</p>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                            <div class="bg-green-900/30 p-3 rounded-lg text-center">
                                <span class="text-green-400 font-bold">1. GET INPUTS</span>
                                <p class="text-xs text-gray-400 mt-1">Read data from the order (DN_NO, AREA_CODE, etc.)</p>
                            </div>
                            <div class="bg-blue-900/30 p-3 rounded-lg text-center">
                                <span class="text-blue-400 font-bold">2. DO SOMETHING</span>
                                <p class="text-xs text-gray-400 mt-1">Call a service, validate, transform</p>
                            </div>
                            <div class="bg-purple-900/30 p-3 rounded-lg text-center">
                                <span class="text-purple-400 font-bold">3. SET OUTPUTS</span>
                                <p class="text-xs text-gray-400 mt-1">Pass results to the next task</p>
                            </div>
                        </div>
                    </div>

                    <!-- Simple Example -->
                    <div class="bg-primary rounded-xl p-4">
                        <h3 class="font-semibold text-yellow-400 mb-3"><i class="fas fa-code mr-2"></i>Simple Example</h3>
                        <div class="code-block">
                            <code>
<span class="comment">// 1. Get input from order</span>
def phoneNumber = input.get("DN_NO")

<span class="comment">// 2. Call VC4 to check if port is free</span>
def result = vc4Service.getLineDetails(phoneNumber)

<span class="comment">// 3. Check result and set output</span>
if (result.DATA_STATUS == "FREE") {
    output.set("PORT_STATUS", "AVAILABLE")
    output.set("MSAN_IP", result.MSAN_IP)
} else {
    throw new FalloutException("Port not free")
}
                            </code>
                        </div>
                    </div>

                    <!-- Why It's Unique -->
                    <div class="bg-primary rounded-xl p-4">
                        <h3 class="font-semibold text-purple-400 mb-3"><i class="fas fa-star mr-2"></i>Why It's Unique</h3>
                        <div class="overflow-x-auto">
                            <table class="ref-table w-full text-sm">
                                <thead>
                                    <tr>
                                        <th>Feature</th>
                                        <th>What It Means</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr><td class="text-cyan-400">Built-in Service Calls</td><td>Pre-defined functions to call VC4, EMS, etc.</td></tr>
                                    <tr><td class="text-cyan-400">Automatic Rollback</td><td>If task fails, FlowOne knows how to undo it</td></tr>
                                    <tr><td class="text-cyan-400">Fallout Handling</td><td>Scripts can trigger RETRY, STOP, IGNORE, ROLLBACK</td></tr>
                                    <tr><td class="text-cyan-400">Order Context</td><td>Scripts can access any order data without extra setup</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- Key Functions -->
                    <div class="bg-primary rounded-xl p-4">
                        <h3 class="font-semibold text-orange-400 mb-3"><i class="fas fa-key mr-2"></i>Key Functions You'll See</h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div class="bg-orange-900/30 p-3 rounded-lg">
                                <code class="text-orange-300">input.get("PARAM")</code>
                                <p class="text-xs text-gray-400 mt-1">Read from order</p>
                            </div>
                            <div class="bg-orange-900/30 p-3 rounded-lg">
                                <code class="text-orange-300">output.set("PARAM", value)</code>
                                <p class="text-xs text-gray-400 mt-1">Write to order</p>
                            </div>
                            <div class="bg-orange-900/30 p-3 rounded-lg">
                                <code class="text-orange-300">lookupService.get("TABLE", "KEY")</code>
                                <p class="text-xs text-gray-400 mt-1">Lookup config tables</p>
                            </div>
                            <div class="bg-orange-900/30 p-3 rounded-lg">
                                <code class="text-orange-300">throw new FalloutException()</code>
                                <p class="text-xs text-gray-400 mt-1">Trigger fallout handling</p>
                            </div>
                        </div>
                    </div>

                    <!-- In Practice -->
                    <div class="memory-card">
                        <h4><i class="fas fa-brain mr-2"></i>In Practice</h4>
                        <p class="text-sm text-gray-300">When you see a FlowOne workflow like "Create FTTH Data", each phase (Validation → D&A → Provision → Commit) runs multiple TL scripts that chain together, passing data through <code>input</code>/<code>output</code>.</p>
                        <p class="mnemonic mt-2">TL = Groovy + FlowOne helpers for telecom provisioning without boilerplate</p>
                    </div>
                </div>
            </div>

            <!-- FlowOne Scripting Tab -->
            <div id="tab-fo-scripting" class="tab-content">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="cheat-sheet-card p-4 rounded-xl">
                        <h4 class="font-semibold text-blue-400 mb-3"><i class="fas fa-code mr-2"></i>FlowOne Task Library (TL) Scripting</h4>
                        <div class="code-block">
                            <code>
<span class="comment">// Nokia FlowOne uses Groovy-based scripting</span>
<span class="comment">// TL_Validation library example</span>

<span class="comment">// Get input parameters</span>
def dnNo = input.get("DN_NO")
def areaCode = input.get("AREA_CODE")
def packageName = input.get("PACKAGE_NAME")

<span class="comment">// Validation logic</span>
if (dnNo == null || dnNo.isEmpty()) {
    throw new Exception("DN_NO is required")
}

<span class="comment">// Set output parameters</span>
output.put("VALIDATED", "true")
output.put("DN_NO", dnNo)

<span class="comment">// Logging</span>
log.info("Validated DN: " + dnNo)
log.error("Validation failed: " + msg)
                            </code>
                        </div>
                    </div>

                    <div class="cheat-sheet-card p-4 rounded-xl">
                        <h4 class="font-semibold text-green-400 mb-3"><i class="fas fa-database mr-2"></i>VC4 Inventory Calls</h4>
                        <div class="code-block">
                            <code>
<span class="comment">// VC4 SOAP Service Calls in FlowOne</span>

<span class="comment">// GET_LINE_BASIC_DETAILS</span>
def vc4Response = vc4Service.call(
    "GET_LINE_BASIC_DETAILS",
    [DN_NO: dnNo, AREA_CODE: areaCode]
)

<span class="comment">// Parse response</span>
def msanIp = vc4Response.MSAN_IP
def slot = vc4Response.SLOT
def port = vc4Response.PORT
def dataStatus = vc4Response.DATA_STATUS

<span class="comment">// Check availability</span>
if (dataStatus != "FREE") {
    fallout("Port not available", "STOP")
}

<span class="comment">// Reserve VLAN</span>
def vlanResponse = vc4Service.call(
    "DATA_CREATE_RESERVE_VLAN",
    [DN_NO: dnNo, PACKAGE: packageName]
)
                            </code>
                        </div>
                    </div>

                    <div class="cheat-sheet-card p-4 rounded-xl">
                        <h4 class="font-semibold text-purple-400 mb-3"><i class="fas fa-play-circle mr-2"></i>P&A Provisioning Calls</h4>
                        <div class="code-block">
                            <code>
<span class="comment">// P&A CFS Creation in FlowOne</span>

<span class="comment">// Create FTTH Data Access</span>
def paParams = [
    MSAN_IP: msanIp,
    SLOT: slot,
    PORT: port,
    ONT_ID: ontId,
    INNER_VLAN: innerVlan,
    OUTER_VLAN: outerVlan,
    OPTIMIZE_LINE: "Y"
]

def paResult = paService.create(
    "CFS_FTTH_DATA_ACCESS",
    paParams
)

<span class="comment">// Handle rollback on failure</span>
if (paResult.status == "FAILED") {
    rollback("Delete FTTH DATA Access")
}

<span class="comment">// Suspend/Resume calls</span>
paService.suspend("CFS_ACCESS_SUSPEND", params)
paService.resume("CFS_ACCESS_RESUME", params)
                            </code>
                        </div>
                    </div>

                    <div class="cheat-sheet-card p-4 rounded-xl">
                        <h4 class="font-semibold text-orange-400 mb-3"><i class="fas fa-exclamation-triangle mr-2"></i>Fallout Handling</h4>
                        <div class="code-block">
                            <code>
<span class="comment">// FlowOne Fallout Actions</span>

<span class="comment">// LOOKUP_FALLOUT configuration</span>
def falloutConfig = [
    "IGNORE": "Continue execution",
    "RETRY": "Retry with backoff",
    "ROLLBACK": "Undo all steps",
    "STOP": "Halt and manual",
    "OH": "Send to Order Hub"
]

<span class="comment">// Trigger fallout</span>
if (error) {
    fallout(
        errorCode,
        falloutConfig.get(policy),
        errorMessage
    )
}

<span class="comment">// UNDO task definition</span>
undoTask = "Delete_FTTH_DATA_Access"
undoParams = [DN_NO: dnNo, SERVICE_ID: svcId]
                            </code>
                        </div>
                    </div>
                </div>

                <div class="memory-card mt-6">
                    <h4><i class="fas fa-brain mr-2"></i>FlowOne Scripting Memory Aid</h4>
                    <p class="mnemonic">input → process → output → fallout</p>
                    <p class="text-sm text-gray-400 mt-2">Always: Get inputs, validate, call services, set outputs, handle errors</p>
                </div>
            </div>

            <!-- SOAP Testing Tab -->
            <div id="tab-soap-testing" class="tab-content">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="cheat-sheet-card p-4 rounded-xl">
                        <h4 class="font-semibold text-blue-400 mb-3"><i class="fas fa-vial mr-2"></i>SOAP UI Test Structure</h4>
                        <div class="mb-3">
                            <img src="img/soap-test-structure.png" alt="SOAP UI Test Structure" class="rounded-lg border border-gray-700 max-w-full h-auto" style="max-height: 250px;">
                        </div>
                        <div class="code-block">
                            <code>
<span class="comment">/* SOAP UI Project Structure for FlowOne */</span>

Projects/
├── TE/
│   ├── InstantLinkWebServicesPortBinding/
│   │   ├── Feasibility/
│   │   │   └── Voice Feasibility/
│   │   │       └── Test Steps (5)
│   │   │           ├── Active
│   │   │           ├── Passive
│   │   │           ├── Nearest_DN_No
│   │   │           ├── Active_MSAN_Code
│   │   │           └── Release
│   │   └── Load Tests (0)
│   │   └── Security Tests (0)
│   └── SIP PSTN and FVNO/
                            </code>
                        </div>
                        <p class="text-xs text-gray-400 mt-2">Test steps validate feasibility check parameters</p>
                    </div>

                    <div class="cheat-sheet-card p-4 rounded-xl">
                        <h4 class="font-semibold text-green-400 mb-3"><i class="fas fa-file-code mr-2"></i>SOAP Request Template</h4>
                        <div class="code-block">
                            <code>
<span class="comment">&lt;!-- VC4 Feasibility Request --&gt;</span>
&lt;soapenv:Envelope&gt;
  &lt;soapenv:Body&gt;
    &lt;feas:FeasibilityRequest&gt;
      &lt;DN_NO&gt;\${DN_NO}&lt;/DN_NO&gt;
      &lt;AREA_CODE&gt;\${AREA_CODE}&lt;/AREA_CODE&gt;
      &lt;SERVICE_TYPE&gt;DATA&lt;/SERVICE_TYPE&gt;
      &lt;CHECK_TYPE&gt;ACTIVE&lt;/CHECK_TYPE&gt;
    &lt;/feas:FeasibilityRequest&gt;
  &lt;/soapenv:Body&gt;
&lt;/soapenv:Envelope&gt;

<span class="comment">&lt;!-- Expected Response --&gt;</span>
&lt;FeasibilityResponse&gt;
  &lt;STATUS&gt;FEASIBLE&lt;/STATUS&gt;
  &lt;MSAN_IP&gt;x.x.x.x&lt;/MSAN_IP&gt;
  &lt;SLOT&gt;1&lt;/SLOT&gt;
  &lt;PORT&gt;12&lt;/PORT&gt;
&lt;/FeasibilityResponse&gt;
                            </code>
                        </div>
                    </div>

                    <div class="cheat-sheet-card p-4 rounded-xl">
                        <h4 class="font-semibold text-purple-400 mb-3"><i class="fas fa-check-circle mr-2"></i>Test Assertions</h4>
                        <div class="code-block">
                            <code>
<span class="comment">// SOAP UI Groovy Assertions</span>

<span class="comment">// Check response status</span>
def response = context.response
assert response.contains("FEASIBLE")

<span class="comment">// XPath assertion</span>
def status = holder.getNodeValue(
    "//FeasibilityResponse/STATUS"
)
assert status == "FEASIBLE"

<span class="comment">// Transfer property to next step</span>
def msanIp = holder.getNodeValue("//MSAN_IP")
testRunner.testCase.setPropertyValue(
    "MSAN_IP", msanIp
)

<span class="comment">// Conditional next step</span>
if (status == "NOT_FEASIBLE") {
    testRunner.gotoStepByName("Release")
}
                            </code>
                        </div>
                    </div>

                    <div class="cheat-sheet-card p-4 rounded-xl">
                        <h4 class="font-semibold text-orange-400 mb-3"><i class="fas fa-list-ol mr-2"></i>Test Step Types</h4>
                        <div class="space-y-2 text-sm">
                            <div class="flex items-center bg-primary p-2 rounded">
                                <span class="w-32 text-green-400">Active</span>
                                <span class="text-gray-400">Check if line is active</span>
                            </div>
                            <div class="flex items-center bg-primary p-2 rounded">
                                <span class="w-32 text-blue-400">Passive</span>
                                <span class="text-gray-400">Check passive line status</span>
                            </div>
                            <div class="flex items-center bg-primary p-2 rounded">
                                <span class="w-32 text-purple-400">Nearest_DN_No</span>
                                <span class="text-gray-400">Find nearest available DN</span>
                            </div>
                            <div class="flex items-center bg-primary p-2 rounded">
                                <span class="w-32 text-yellow-400">Active_MSAN_Code</span>
                                <span class="text-gray-400">Get MSAN code for DN</span>
                            </div>
                            <div class="flex items-center bg-primary p-2 rounded">
                                <span class="w-32 text-red-400">Release</span>
                                <span class="text-gray-400">Release reserved resources</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- cURL Telecom Tab -->
            <div id="tab-curl-telecom" class="tab-content">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="cheat-sheet-card p-4 rounded-xl">
                        <h4 class="font-semibold text-blue-400 mb-3"><i class="fas fa-terminal mr-2"></i>VC4 SOAP cURL</h4>
                        <div class="code-block">
                            <code>
<span class="comment"># VC4 Feasibility Check</span>
curl -X POST \\
  'http://vc4-server:8080/vc4/services' \\
  -H 'Content-Type: text/xml' \\
  -H 'SOAPAction: getFeasibility' \\
  -d '&lt;soapenv:Envelope&gt;
    &lt;soapenv:Body&gt;
      &lt;GetFeasibility&gt;
        &lt;DN_NO&gt;12345678&lt;/DN_NO&gt;
        &lt;AREA_CODE&gt;02&lt;/AREA_CODE&gt;
      &lt;/GetFeasibility&gt;
    &lt;/soapenv:Body&gt;
  &lt;/soapenv:Envelope&gt;'

<span class="comment"># Parse response with xmllint</span>
curl ... | xmllint --xpath \\
  "//STATUS/text()" -
                            </code>
                        </div>
                    </div>

                    <div class="cheat-sheet-card p-4 rounded-xl">
                        <h4 class="font-semibold text-green-400 mb-3"><i class="fas fa-broadcast-tower mr-2"></i>EMS API Calls</h4>
                        <div class="code-block">
                            <code>
<span class="comment"># Nokia APC SOAP call</span>
curl -X POST \\
  'https://nokia-apc:8443/apc/services' \\
  -H 'Content-Type: text/xml' \\
  --cert client.pem \\
  -d @create_service.xml

<span class="comment"># Huawei NCE REST call</span>
curl -X POST \\
  'https://huawei-nce/api/v1/service' \\
  -H 'Authorization: Bearer \${TOKEN}' \\
  -H 'Content-Type: application/json' \\
  -d '{
    "operation": "CREATE",
    "oltIp": "x.x.x.x",
    "slot": 1,
    "port": 12
  }'
                            </code>
                        </div>
                    </div>

                    <div class="cheat-sheet-card p-4 rounded-xl">
                        <h4 class="font-semibold text-purple-400 mb-3"><i class="fas fa-tv mr-2"></i>IPTV Backend</h4>
                        <div class="code-block">
                            <code>
<span class="comment"># IPTV Huawei SOAP Provision</span>
curl -X POST \\
  'http://iptv-backend:8080/iptv/ws' \\
  -H 'Content-Type: text/xml' \\
  -d '&lt;CreateIPTVSubscriber&gt;
    &lt;AccountNo&gt;ACC123&lt;/AccountNo&gt;
    &lt;Package&gt;PREMIUM&lt;/Package&gt;
    &lt;STB_MAC&gt;AA:BB:CC:DD:EE:FF&lt;/STB_MAC&gt;
  &lt;/CreateIPTVSubscriber&gt;'

<span class="comment"># Check subscriber status</span>
curl -X POST ... \\
  -d '&lt;GetIPTVStatus&gt;
    &lt;AccountNo&gt;ACC123&lt;/AccountNo&gt;
  &lt;/GetIPTVStatus&gt;'
                            </code>
                        </div>
                    </div>

                    <div class="cheat-sheet-card p-4 rounded-xl">
                        <h4 class="font-semibold text-orange-400 mb-3"><i class="fas fa-heartbeat mr-2"></i>Health & Monitoring</h4>
                        <div class="code-block">
                            <code>
<span class="comment"># FlowOne health check</span>
curl -s 'http://flowone:8080/health' \\
  | jq '.status'

<span class="comment"># Check order status</span>
curl -X GET \\
  'http://flowone:8080/api/orders/ORD123' \\
  -H 'Accept: application/json'

<span class="comment"># Batch status check script</span>
for srv in flowone vc4 nokia-apc; do
  echo -n "\$srv: "
  curl -s -o /dev/null -w "%{http_code}" \\
    "http://\$srv:8080/health"
  echo
done
                            </code>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Bash Basics Tab -->
            <div id="tab-bash-basics" class="tab-content">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="cheat-sheet-card p-4 rounded-xl">
                        <h4 class="font-semibold text-blue-400 mb-3"><i class="fas fa-play mr-2"></i>Script Basics</h4>
                        <div class="code-block">
                            <code>
<span class="comment">#!/bin/bash</span>
<span class="comment"># Script header - always include</span>

<span class="comment"># Variables</span>
NAME="value"
echo \$NAME
echo "Hello \${NAME}"

<span class="comment"># Read input</span>
read -p "Enter name: " USERNAME
echo "Hello \$USERNAME"

<span class="comment"># Command substitution</span>
DATE=\$(date +%Y-%m-%d)
FILES=\\\`ls -1\\\`
                            </code>
                        </div>
                    </div>

                    <div class="cheat-sheet-card p-4 rounded-xl">
                        <h4 class="font-semibold text-green-400 mb-3"><i class="fas fa-code-branch mr-2"></i>Conditionals</h4>
                        <div class="code-block">
                            <code>
<span class="comment"># If statement</span>
if [ "\$VAR" = "value" ]; then
    echo "Match"
elif [ "\$VAR" = "other" ]; then
    echo "Other"
else
    echo "No match"
fi

<span class="comment"># File tests</span>
-f file    <span class="comment"># is file</span>
-d dir     <span class="comment"># is directory</span>
-e path    <span class="comment"># exists</span>
-r file    <span class="comment"># readable</span>
-w file    <span class="comment"># writable</span>
-x file    <span class="comment"># executable</span>
                            </code>
                        </div>
                    </div>

                    <div class="cheat-sheet-card p-4 rounded-xl">
                        <h4 class="font-semibold text-purple-400 mb-3"><i class="fas fa-redo mr-2"></i>Loops</h4>
                        <div class="code-block">
                            <code>
<span class="comment"># For loop</span>
for i in 1 2 3; do
    echo \$i
done

for file in *.txt; do
    echo "Processing \$file"
done

<span class="comment"># While loop</span>
while [ \$COUNT -lt 10 ]; do
    echo \$COUNT
    ((COUNT++))
done

<span class="comment"># Read file line by line</span>
while read line; do
    echo "\$line"
done < file.txt
                            </code>
                        </div>
                    </div>

                    <div class="cheat-sheet-card p-4 rounded-xl">
                        <h4 class="font-semibold text-orange-400 mb-3"><i class="fas fa-cube mr-2"></i>Functions</h4>
                        <div class="code-block">
                            <code>
<span class="comment"># Define function</span>
my_function() {
    local VAR="local value"
    echo "Arg1: \$1, Arg2: \$2"
    return 0
}

<span class="comment"># Call function</span>
my_function "hello" "world"
RESULT=\$?  <span class="comment"># exit status</span>

<span class="comment"># Error handling</span>
set -e     <span class="comment"># exit on error</span>
set -u     <span class="comment"># error on undefined var</span>
set -o pipefail <span class="comment"># pipe errors</span>
                            </code>
                        </div>
                    </div>
                </div>
            </div>

            <div class="memory-card mt-6">
                <h4><i class="fas fa-brain mr-2"></i>Memory Aid: FlowOne Integration Flow</h4>
                <p class="mnemonic">BSS → MW11 → FlowOne(OM→P&A) → VC4 → EMS → Network</p>
                <p class="text-sm text-gray-400 mt-2">Request flows: Northbound → Middleware 11 → FlowOne Order Mgmt → Provisioning → Inventory → Network Elements</p>
            </div>
        </div>
    `;
    document.getElementById('flowone-modules').after(section);
}

/**
 * Load Java OOP Cheat Sheet
 */
function loadJavaOOPCheatSheet() {
    const section = document.createElement('section');
    section.id = 'java-oop';
    section.className = 'mb-12 scroll-mt-8';
    section.innerHTML = `
        <div class="bg-secondary rounded-2xl p-6 shadow-xl">
            <h2 class="text-2xl font-bold mb-6 flex items-center">
                <i class="fab fa-java mr-3 text-orange-400"></i>Java OOP Cheat Sheet
            </h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="cheat-sheet-card p-4 rounded-xl">
                    <h4 class="font-semibold text-blue-400 mb-3"><i class="fas fa-cube mr-2"></i>Classes & Objects</h4>
                    <div class="code-block">
                        <code>
<span class="keyword">public class</span> <span class="function">Person</span> {
    <span class="comment">// Fields</span>
    <span class="keyword">private</span> String name;
    <span class="keyword">private</span> <span class="keyword">int</span> age;
    
    <span class="comment">// Constructor</span>
    <span class="keyword">public</span> <span class="function">Person</span>(String name, <span class="keyword">int</span> age) {
        <span class="keyword">this</span>.name = name;
        <span class="keyword">this</span>.age = age;
    }
    
    <span class="comment">// Getter/Setter</span>
    <span class="keyword">public</span> String <span class="function">getName</span>() { <span class="keyword">return</span> name; }
    <span class="keyword">public void</span> <span class="function">setName</span>(String n) { name = n; }
}
                        </code>
                    </div>
                </div>

                <div class="cheat-sheet-card p-4 rounded-xl">
                    <h4 class="font-semibold text-green-400 mb-3"><i class="fas fa-sitemap mr-2"></i>Inheritance</h4>
                    <div class="code-block">
                        <code>
<span class="keyword">public class</span> <span class="function">Employee</span> <span class="keyword">extends</span> Person {
    <span class="keyword">private</span> String role;
    
    <span class="keyword">public</span> <span class="function">Employee</span>(String name, <span class="keyword">int</span> age, String role) {
        <span class="keyword">super</span>(name, age);  <span class="comment">// call parent</span>
        <span class="keyword">this</span>.role = role;
    }
    
    <span class="comment">// Override method</span>
    @Override
    <span class="keyword">public</span> String <span class="function">toString</span>() {
        <span class="keyword">return</span> getName() + <span class="string">" - "</span> + role;
    }
}
                        </code>
                    </div>
                </div>

                <div class="cheat-sheet-card p-4 rounded-xl">
                    <h4 class="font-semibold text-purple-400 mb-3"><i class="fas fa-layer-group mr-2"></i>Interfaces & Abstract</h4>
                    <div class="code-block">
                        <code>
<span class="comment">// Interface</span>
<span class="keyword">public interface</span> <span class="function">Printable</span> {
    <span class="keyword">void</span> <span class="function">print</span>();
    <span class="keyword">default void</span> <span class="function">log</span>() { <span class="comment">/*...*/</span> }
}

<span class="comment">// Abstract class</span>
<span class="keyword">public abstract class</span> <span class="function">Animal</span> {
    <span class="keyword">abstract void</span> <span class="function">sound</span>();
    <span class="keyword">public void</span> <span class="function">sleep</span>() { <span class="comment">/*...*/</span> }
}

<span class="comment">// Implementation</span>
<span class="keyword">public class</span> Dog <span class="keyword">extends</span> Animal 
    <span class="keyword">implements</span> Printable { ... }
                        </code>
                    </div>
                </div>

                <div class="cheat-sheet-card p-4 rounded-xl">
                    <h4 class="font-semibold text-orange-400 mb-3"><i class="fas fa-shield-alt mr-2"></i>Access Modifiers</h4>
                    <div class="code-block">
                        <code>
<span class="comment">// Access levels</span>
<span class="keyword">public</span>       <span class="comment">// everywhere</span>
<span class="keyword">protected</span>    <span class="comment">// same package + subclass</span>
<span class="comment">(default)</span>    <span class="comment">// same package only</span>
<span class="keyword">private</span>      <span class="comment">// same class only</span>

<span class="comment">// Other modifiers</span>
<span class="keyword">static</span>       <span class="comment">// class level</span>
<span class="keyword">final</span>        <span class="comment">// constant/no override</span>
<span class="keyword">abstract</span>     <span class="comment">// must be implemented</span>
                        </code>
                    </div>
                </div>
            </div>

            <div class="memory-card mt-6">
                <h4><i class="fas fa-brain mr-2"></i>Memory Aid: OOP Pillars</h4>
                <p class="mnemonic">A PIE = Abstraction, Polymorphism, Inheritance, Encapsulation</p>
                <p class="text-sm text-gray-400 mt-2">
                    <strong>Abstraction:</strong> Hide complexity | 
                    <strong>Polymorphism:</strong> Many forms | 
                    <strong>Inheritance:</strong> Reuse code | 
                    <strong>Encapsulation:</strong> Hide data
                </p>
            </div>
        </div>
    `;
    document.getElementById('shell-scripting').after(section);
}

/**
 * Load Service Lifecycles Section
 */
function loadServiceLifecycles() {
    const overviewSection = document.getElementById('overview');
    if (!overviewSection) return;

    // Create FTTH Data Lifecycle Section
    const ftthSection = document.createElement('section');
    ftthSection.id = 'ftth-lifecycle';
    ftthSection.className = 'mb-12 scroll-mt-8';
    ftthSection.innerHTML = `
        <div class="bg-secondary rounded-2xl p-6 shadow-xl">
            <h2 class="text-2xl font-bold mb-6 flex items-center">
                <i class="fas fa-fiber-manual-record mr-3 text-green-400"></i>FTTH Data Service Lifecycle
            </h2>
            
            <!-- Lifecycle Tabs -->
            <div class="tab-container mb-6">
                <button class="tab-btn active" data-tab="ftth-create">Create</button>
                <button class="tab-btn" data-tab="ftth-suspend">Suspend</button>
                <button class="tab-btn" data-tab="ftth-resume">Resume</button>
                <button class="tab-btn" data-tab="ftth-terminate">Terminate</button>
                <button class="tab-btn" data-tab="ftth-change">Change Package</button>
            </div>

            <!-- CREATE Flow -->
            <div id="tab-ftth-create" class="tab-content active">
                <h3 class="text-xl font-semibold mb-4 text-green-400">Create FTTH Data Service</h3>
                <div class="space-y-4">
                    <!-- Phase 1: Validation -->
                    <div class="bg-primary rounded-xl p-4 border-l-4 border-blue-500">
                        <h4 class="font-semibold text-blue-400 mb-2">Phase 1: Validation</h4>
                        <p class="text-sm text-gray-400 mb-2">TL_Validation library validates input parameters</p>
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                            <span class="bg-blue-900/50 px-2 py-1 rounded">DN_NO</span>
                            <span class="bg-blue-900/50 px-2 py-1 rounded">AREA_CODE</span>
                            <span class="bg-blue-900/50 px-2 py-1 rounded">PACKAGE_NAME</span>
                            <span class="bg-blue-900/50 px-2 py-1 rounded">ACCOUNT_NO</span>
                            <span class="bg-blue-900/50 px-2 py-1 rounded">ISP_ID</span>
                        </div>
                    </div>

                    <!-- Phase 2: D&A -->
                    <div class="bg-primary rounded-xl p-4 border-l-4 border-purple-500">
                        <h4 class="font-semibold text-purple-400 mb-2">Phase 2: Design & Assign (D&A)</h4>
                        <div class="space-y-3">
                            <div class="bg-purple-900/30 p-3 rounded-lg">
                                <p class="font-mono text-sm text-purple-300">VC4.GET_LINE_BASIC_DETAILS</p>
                                <p class="text-xs text-gray-400 mt-1">Fetch port info: MSAN_IP, MSAN_VENDOR, EMS_NAME, SLOT, PORT, ONT_ID</p>
                                <p class="text-xs text-red-400 mt-1">Fallout: DATA_STATUS != "FREE" → Failed</p>
                            </div>
                            <div class="bg-purple-900/30 p-3 rounded-lg">
                                <p class="font-mono text-sm text-purple-300">VC4.DATA_CREATE_RESERVE_VLAN</p>
                                <p class="text-xs text-gray-400 mt-1">Reserve VLAN resources: INNER_VLAN, OUTER_VLAN, USER_VLAN, SERVICE_ID</p>
                                <p class="text-xs text-yellow-400 mt-1">Fallout: Retry per LOOKUP_FALLOUT config</p>
                            </div>
                        </div>
                    </div>

                    <!-- Phase 3: Provision -->
                    <div class="bg-primary rounded-xl p-4 border-l-4 border-green-500">
                        <h4 class="font-semibold text-green-400 mb-2">Phase 3: Provision</h4>
                        <div class="bg-green-900/30 p-3 rounded-lg">
                            <p class="font-mono text-sm text-green-300">P&A.Create FTTH DATA Access (CFS_FTTH_DATA_ACCESS)</p>
                            <p class="text-xs text-gray-400 mt-1">Configure on EMS: MSAN_IP, SLOT, PORT, ONT_ID, VLANs, OPTIMIZE_LINE</p>
                            <p class="text-xs text-red-400 mt-1">Fallout: Rollback → Delete FTTH DATA Access</p>
                        </div>
                    </div>

                    <!-- Phase 4: Commit -->
                    <div class="bg-primary rounded-xl p-4 border-l-4 border-orange-500">
                        <h4 class="font-semibold text-orange-400 mb-2">Phase 4: Commit</h4>
                        <div class="bg-orange-900/30 p-3 rounded-lg">
                            <p class="font-mono text-sm text-orange-300">VC4.DATA_CREATE_COMMIT</p>
                            <p class="text-xs text-gray-400 mt-1">Finalize reservation: DN_NO, PACKAGE_NAME, ACCOUNT_NO, SERVICE_ID</p>
                            <p class="text-xs text-yellow-400 mt-1">Fallout: Retry per LOOKUP_FALLOUT config</p>
                        </div>
                    </div>

                    <!-- Response -->
                    <div class="bg-primary rounded-xl p-4 border-l-4 border-cyan-500">
                        <h4 class="font-semibold text-cyan-400 mb-2">Final Response</h4>
                        <p class="text-sm text-gray-400">Send acknowledgment to CRM/BSS with order status</p>
                    </div>
                </div>
            </div>

            <!-- SUSPEND Flow -->
            <div id="tab-ftth-suspend" class="tab-content">
                <h3 class="text-xl font-semibold mb-4 text-yellow-400">Suspend FTTH Data Service</h3>
                <div class="space-y-4">
                    <div class="bg-primary rounded-xl p-4 border-l-4 border-blue-500">
                        <h4 class="font-semibold text-blue-400 mb-2">Phase 1: Validation</h4>
                        <p class="text-sm text-gray-400">Validate DN_NO, AREA_CODE</p>
                    </div>
                    <div class="bg-primary rounded-xl p-4 border-l-4 border-purple-500">
                        <h4 class="font-semibold text-purple-400 mb-2">Phase 2: D&A</h4>
                        <div class="bg-purple-900/30 p-3 rounded-lg">
                            <p class="font-mono text-sm text-purple-300">VC4.GET_LINE_FULL_DETAILS</p>
                            <p class="text-xs text-gray-400 mt-1">Fetch current config: PACKAGE, VLANs, EMS details</p>
                        </div>
                    </div>
                    <div class="bg-primary rounded-xl p-4 border-l-4 border-yellow-500">
                        <h4 class="font-semibold text-yellow-400 mb-2">Phase 3: Provision</h4>
                        <div class="bg-yellow-900/30 p-3 rounded-lg">
                            <p class="font-mono text-sm text-yellow-300">P&A.Suspend FTTH Data Access (CFS_ACCESS_SUSPEND)</p>
                            <p class="text-xs text-gray-400 mt-1">Disable service on EMS, keep configuration</p>
                            <p class="text-xs text-red-400 mt-1">UNDO: Resume FTTH Data Access</p>
                        </div>
                    </div>
                    <div class="bg-primary rounded-xl p-4 border-l-4 border-orange-500">
                        <h4 class="font-semibold text-orange-400 mb-2">Phase 4: Commit</h4>
                        <div class="bg-orange-900/30 p-3 rounded-lg">
                            <p class="font-mono text-sm text-orange-300">VC4.DATA_SUSPEND</p>
                            <p class="text-xs text-gray-400 mt-1">Update inventory status to SUSPENDED</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- RESUME Flow -->
            <div id="tab-ftth-resume" class="tab-content">
                <h3 class="text-xl font-semibold mb-4 text-blue-400">Resume FTTH Data Service</h3>
                <div class="space-y-4">
                    <div class="bg-primary rounded-xl p-4 border-l-4 border-blue-500">
                        <h4 class="font-semibold text-blue-400 mb-2">Phase 1: Validation</h4>
                        <p class="text-sm text-gray-400">Validate DN_NO, AREA_CODE</p>
                    </div>
                    <div class="bg-primary rounded-xl p-4 border-l-4 border-purple-500">
                        <h4 class="font-semibold text-purple-400 mb-2">Phase 2: D&A</h4>
                        <div class="bg-purple-900/30 p-3 rounded-lg">
                            <p class="font-mono text-sm text-purple-300">VC4.GET_LINE_FULL_DETAILS</p>
                            <p class="text-xs text-gray-400 mt-1">Fetch suspended config for restoration</p>
                        </div>
                    </div>
                    <div class="bg-primary rounded-xl p-4 border-l-4 border-green-500">
                        <h4 class="font-semibold text-green-400 mb-2">Phase 3: Provision</h4>
                        <div class="bg-green-900/30 p-3 rounded-lg">
                            <p class="font-mono text-sm text-green-300">P&A.Resume FTTH Data Access (CFS_ACCESS_RESUME)</p>
                            <p class="text-xs text-gray-400 mt-1">Re-enable service with same configuration</p>
                            <p class="text-xs text-red-400 mt-1">UNDO: Suspend FTTH Data Access</p>
                        </div>
                    </div>
                    <div class="bg-primary rounded-xl p-4 border-l-4 border-orange-500">
                        <h4 class="font-semibold text-orange-400 mb-2">Phase 4: Commit</h4>
                        <div class="bg-orange-900/30 p-3 rounded-lg">
                            <p class="font-mono text-sm text-orange-300">VC4.DATA_RESUME</p>
                            <p class="text-xs text-gray-400 mt-1">Update inventory status to ACTIVE</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- TERMINATE Flow -->
            <div id="tab-ftth-terminate" class="tab-content">
                <h3 class="text-xl font-semibold mb-4 text-red-400">Terminate FTTH Data Service</h3>
                <div class="space-y-4">
                    <div class="bg-primary rounded-xl p-4 border-l-4 border-blue-500">
                        <h4 class="font-semibold text-blue-400 mb-2">Phase 1: Validation</h4>
                        <p class="text-sm text-gray-400">Validate DN_NO, AREA_CODE, SERVICE_ID</p>
                    </div>
                    <div class="bg-primary rounded-xl p-4 border-l-4 border-purple-500">
                        <h4 class="font-semibold text-purple-400 mb-2">Phase 2: D&A</h4>
                        <div class="bg-purple-900/30 p-3 rounded-lg">
                            <p class="font-mono text-sm text-purple-300">VC4.GET_LINE_FULL_DETAILS</p>
                            <p class="text-xs text-gray-400 mt-1">Fetch all config for cleanup</p>
                        </div>
                    </div>
                    <div class="bg-primary rounded-xl p-4 border-l-4 border-red-500">
                        <h4 class="font-semibold text-red-400 mb-2">Phase 3: Provision</h4>
                        <div class="bg-red-900/30 p-3 rounded-lg">
                            <p class="font-mono text-sm text-red-300">P&A.Delete FTTH DATA Access</p>
                            <p class="text-xs text-gray-400 mt-1">Remove service from EMS, delete cross-connects</p>
                        </div>
                    </div>
                    <div class="bg-primary rounded-xl p-4 border-l-4 border-orange-500">
                        <h4 class="font-semibold text-orange-400 mb-2">Phase 4: Commit</h4>
                        <div class="bg-orange-900/30 p-3 rounded-lg">
                            <p class="font-mono text-sm text-orange-300">VC4.DATA_DELETE_COMMIT</p>
                            <p class="text-xs text-gray-400 mt-1">Release resources, set status to FREE</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- CHANGE PACKAGE Flow -->
            <div id="tab-ftth-change" class="tab-content">
                <h3 class="text-xl font-semibold mb-4 text-purple-400">Change Package (Upgrade/Downgrade)</h3>
                <div class="space-y-4">
                    <div class="bg-primary rounded-xl p-4 border-l-4 border-blue-500">
                        <h4 class="font-semibold text-blue-400 mb-2">Phase 1: Validation</h4>
                        <p class="text-sm text-gray-400">Validate DN_NO, AREA_CODE, NEW_PACKAGE_NAME</p>
                    </div>
                    <div class="bg-primary rounded-xl p-4 border-l-4 border-purple-500">
                        <h4 class="font-semibold text-purple-400 mb-2">Phase 2: D&A</h4>
                        <div class="bg-purple-900/30 p-3 rounded-lg">
                            <p class="font-mono text-sm text-purple-300">VC4.DATA_CREATE_RESERVE_VLAN (IS_NEW_SUBSCRIBER=FALSE)</p>
                            <p class="text-xs text-gray-400 mt-1">Check if VLAN change needed for new speed</p>
                        </div>
                    </div>
                    <div class="bg-primary rounded-xl p-4 border-l-4 border-green-500">
                        <h4 class="font-semibold text-green-400 mb-2">Phase 3: Provision</h4>
                        <div class="bg-green-900/30 p-3 rounded-lg">
                            <p class="font-mono text-sm text-green-300">P&A.Modify FTTH DATA Access</p>
                            <p class="text-xs text-gray-400 mt-1">Update speed profile: 30→70→100→200 Mbps</p>
                            <p class="text-xs text-yellow-400 mt-1">May require cross-connect recreation for major upgrades</p>
                        </div>
                    </div>
                    <div class="bg-primary rounded-xl p-4 border-l-4 border-orange-500">
                        <h4 class="font-semibold text-orange-400 mb-2">Phase 4: Commit</h4>
                        <div class="bg-orange-900/30 p-3 rounded-lg">
                            <p class="font-mono text-sm text-orange-300">VC4.DATA_MODIFY_COMMIT</p>
                            <p class="text-xs text-gray-400 mt-1">Update package in inventory</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Create Voice Lifecycle Section
    const voiceSection = document.createElement('section');
    voiceSection.id = 'voice-lifecycle';
    voiceSection.className = 'mb-12 scroll-mt-8';
    voiceSection.innerHTML = `
        <div class="bg-secondary rounded-2xl p-6 shadow-xl">
            <h2 class="text-2xl font-bold mb-6 flex items-center">
                <i class="fas fa-phone-alt mr-3 text-blue-400"></i>FTTH Voice Service Lifecycle
            </h2>
            
            <div class="tab-container mb-6">
                <button class="tab-btn active" data-tab="voice-create">Create</button>
                <button class="tab-btn" data-tab="voice-suspend">Suspend</button>
                <button class="tab-btn" data-tab="voice-resume">Resume</button>
                <button class="tab-btn" data-tab="voice-terminate">Terminate</button>
            </div>

            <!-- Voice CREATE Flow -->
            <div id="tab-voice-create" class="tab-content active">
                <h3 class="text-xl font-semibold mb-4 text-green-400">Create FTTH Voice Service</h3>
                <div class="space-y-4">
                    <div class="bg-primary rounded-xl p-4 border-l-4 border-blue-500">
                        <h4 class="font-semibold text-blue-400 mb-2">Phase 1: Validation</h4>
                        <p class="text-sm text-gray-400">Validate DN_NO, AREA_CODE, OPERATOR, RESERVATION_ID</p>
                    </div>
                    <div class="bg-primary rounded-xl p-4 border-l-4 border-purple-500">
                        <h4 class="font-semibold text-purple-400 mb-2">Phase 2: D&A</h4>
                        <div class="space-y-2">
                            <div class="bg-purple-900/30 p-3 rounded-lg">
                                <p class="font-mono text-sm text-purple-300">VC4.GET_LINE_BASIC_DETAILS</p>
                                <p class="text-xs text-gray-400 mt-1">Check VOICE_STATUS = "FREE"</p>
                            </div>
                            <div class="bg-purple-900/30 p-3 rounded-lg">
                                <p class="font-mono text-sm text-purple-300">VC4.GET_LINE_FULL_DETAILS (by RESERVATION_ID)</p>
                                <p class="text-xs text-gray-400 mt-1">Fetch: GATEWAY_IP, PROXY_IP/PORT, ONT_SIGNALING_IP/PORT</p>
                            </div>
                            <div class="bg-purple-900/30 p-3 rounded-lg">
                                <p class="font-mono text-sm text-purple-300">TL_VC4_DATA_VALIDATION</p>
                                <p class="text-xs text-gray-400 mt-1">Verify VOICE_STATUS="RESERVED", PORT_TYPE="FTTH", OPERATOR match</p>
                            </div>
                        </div>
                    </div>
                    <div class="bg-primary rounded-xl p-4 border-l-4 border-green-500">
                        <h4 class="font-semibold text-green-400 mb-2">Phase 3: Provision</h4>
                        <div class="space-y-2">
                            <div class="bg-green-900/30 p-3 rounded-lg">
                                <p class="font-mono text-sm text-green-300">P&A.Create FTTH Access (CFS_FTTH_ACCESS)</p>
                                <p class="text-xs text-gray-400 mt-1">Configure ONT: DN_NO, PASSWORD (6-digit), SIP settings</p>
                            </div>
                            <div class="bg-green-900/30 p-3 rounded-lg">
                                <p class="font-mono text-sm text-green-300">P&A.Create FIXED Voice (CFS_FIXED_VOICE)</p>
                                <p class="text-xs text-gray-400 mt-1">Core provisioning: DN_NO2 (if dual line), USER_TYPE</p>
                            </div>
                        </div>
                    </div>
                    <div class="bg-primary rounded-xl p-4 border-l-4 border-orange-500">
                        <h4 class="font-semibold text-orange-400 mb-2">Phase 4: Commit</h4>
                        <div class="bg-orange-900/30 p-3 rounded-lg">
                            <p class="font-mono text-sm text-orange-300">VC4.VOICE_CREATE_COMMIT</p>
                            <p class="text-xs text-gray-400 mt-1">Finalize voice service in inventory</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Voice SUSPEND -->
            <div id="tab-voice-suspend" class="tab-content">
                <h3 class="text-xl font-semibold mb-4 text-yellow-400">Suspend Voice Service</h3>
                <div class="space-y-4">
                    <div class="bg-primary rounded-xl p-4 border-l-4 border-purple-500">
                        <h4 class="font-semibold text-purple-400 mb-2">D&A: VC4.GET_LINE_FULL_DETAILS</h4>
                    </div>
                    <div class="bg-primary rounded-xl p-4 border-l-4 border-yellow-500">
                        <h4 class="font-semibold text-yellow-400 mb-2">Provision: P&A.Suspend Voice Access</h4>
                        <p class="text-sm text-gray-400">Disable SIP registration on core</p>
                    </div>
                    <div class="bg-primary rounded-xl p-4 border-l-4 border-orange-500">
                        <h4 class="font-semibold text-orange-400 mb-2">Commit: VC4.VOICE_SUSPEND</h4>
                    </div>
                </div>
            </div>

            <!-- Voice RESUME -->
            <div id="tab-voice-resume" class="tab-content">
                <h3 class="text-xl font-semibold mb-4 text-blue-400">Resume Voice Service</h3>
                <div class="space-y-4">
                    <div class="bg-primary rounded-xl p-4 border-l-4 border-purple-500">
                        <h4 class="font-semibold text-purple-400 mb-2">D&A: VC4.GET_LINE_FULL_DETAILS</h4>
                    </div>
                    <div class="bg-primary rounded-xl p-4 border-l-4 border-green-500">
                        <h4 class="font-semibold text-green-400 mb-2">Provision: P&A.Resume Voice Access</h4>
                        <p class="text-sm text-gray-400">Re-enable SIP registration</p>
                    </div>
                    <div class="bg-primary rounded-xl p-4 border-l-4 border-orange-500">
                        <h4 class="font-semibold text-orange-400 mb-2">Commit: VC4.VOICE_RESUME</h4>
                    </div>
                </div>
            </div>

            <!-- Voice TERMINATE -->
            <div id="tab-voice-terminate" class="tab-content">
                <h3 class="text-xl font-semibold mb-4 text-red-400">Terminate Voice Service</h3>
                <div class="space-y-4">
                    <div class="bg-primary rounded-xl p-4 border-l-4 border-purple-500">
                        <h4 class="font-semibold text-purple-400 mb-2">D&A: VC4.GET_LINE_FULL_DETAILS</h4>
                    </div>
                    <div class="bg-primary rounded-xl p-4 border-l-4 border-red-500">
                        <h4 class="font-semibold text-red-400 mb-2">Provision: P&A.Delete Voice Access + Core</h4>
                        <p class="text-sm text-gray-400">Remove from EMS and core switch</p>
                    </div>
                    <div class="bg-primary rounded-xl p-4 border-l-4 border-orange-500">
                        <h4 class="font-semibold text-orange-400 mb-2">Commit: VC4.VOICE_DELETE_COMMIT</h4>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Create IPTV Lifecycle Section
    const iptvSection = document.createElement('section');
    iptvSection.id = 'iptv-lifecycle';
    iptvSection.className = 'mb-12 scroll-mt-8';
    iptvSection.innerHTML = `
        <div class="bg-secondary rounded-2xl p-6 shadow-xl">
            <h2 class="text-2xl font-bold mb-6 flex items-center">
                <i class="fas fa-tv mr-3 text-purple-400"></i>IPTV Service Lifecycle
            </h2>
            
            <div class="tab-container mb-6">
                <button class="tab-btn active" data-tab="iptv-create">Create</button>
                <button class="tab-btn" data-tab="iptv-suspend">Suspend</button>
                <button class="tab-btn" data-tab="iptv-resume">Resume</button>
                <button class="tab-btn" data-tab="iptv-terminate">Terminate</button>
            </div>

            <!-- IPTV CREATE -->
            <div id="tab-iptv-create" class="tab-content active">
                <h3 class="text-xl font-semibold mb-4 text-green-400">Create IPTV Service</h3>
                <div class="space-y-4">
                    <div class="bg-primary rounded-xl p-4 border-l-4 border-blue-500">
                        <h4 class="font-semibold text-blue-400 mb-2">Phase 1: Validation</h4>
                        <p class="text-sm text-gray-400">Validate DN_NO, AREA_CODE, IPTV_PACKAGE, STB_MAC</p>
                    </div>
                    <div class="bg-primary rounded-xl p-4 border-l-4 border-purple-500">
                        <h4 class="font-semibold text-purple-400 mb-2">Phase 2: D&A</h4>
                        <div class="bg-purple-900/30 p-3 rounded-lg">
                            <p class="font-mono text-sm text-purple-300">VC4.GET_LINE_FULL_DETAILS</p>
                            <p class="text-xs text-gray-400 mt-1">Check IPTV_STATUS, get multicast VLAN</p>
                        </div>
                    </div>
                    <div class="bg-primary rounded-xl p-4 border-l-4 border-green-500">
                        <h4 class="font-semibold text-green-400 mb-2">Phase 3: Provision</h4>
                        <div class="space-y-2">
                            <div class="bg-green-900/30 p-3 rounded-lg">
                                <p class="font-mono text-sm text-green-300">P&A.Create IPTV Access</p>
                                <p class="text-xs text-gray-400 mt-1">Configure multicast on OLT/MSAN</p>
                            </div>
                            <div class="bg-green-900/30 p-3 rounded-lg">
                                <p class="font-mono text-sm text-green-300">Huawei IPTV Platform (SOAP)</p>
                                <p class="text-xs text-gray-400 mt-1">Register STB, assign channels/packages</p>
                            </div>
                        </div>
                    </div>
                    <div class="bg-primary rounded-xl p-4 border-l-4 border-orange-500">
                        <h4 class="font-semibold text-orange-400 mb-2">Phase 4: Commit</h4>
                        <div class="bg-orange-900/30 p-3 rounded-lg">
                            <p class="font-mono text-sm text-orange-300">VC4.IPTV_CREATE_COMMIT</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- IPTV SUSPEND -->
            <div id="tab-iptv-suspend" class="tab-content">
                <h3 class="text-xl font-semibold mb-4 text-yellow-400">Suspend IPTV Service</h3>
                <div class="space-y-4">
                    <div class="bg-primary rounded-xl p-4 border-l-4 border-blue-500">
                        <h4 class="font-semibold text-blue-400 mb-2">Phase 1: Validation</h4>
                        <p class="text-sm text-gray-400">Validate DN_NO, AREA_CODE, ACCOUNT_NO</p>
                    </div>
                    <div class="bg-primary rounded-xl p-4 border-l-4 border-purple-500">
                        <h4 class="font-semibold text-purple-400 mb-2">Phase 2: D&A</h4>
                        <div class="bg-purple-900/30 p-3 rounded-lg">
                            <p class="font-mono text-sm text-purple-300">VC4.GET_LINE_FULL_DETAILS</p>
                            <p class="text-xs text-gray-400 mt-1">Fetch IPTV config, STB_MAC, package details</p>
                        </div>
                    </div>
                    <div class="bg-primary rounded-xl p-4 border-l-4 border-yellow-500">
                        <h4 class="font-semibold text-yellow-400 mb-2">Phase 3: Provision</h4>
                        <div class="space-y-2">
                            <div class="bg-yellow-900/30 p-3 rounded-lg">
                                <p class="font-mono text-sm text-yellow-300">P&A.Suspend IPTV Access</p>
                                <p class="text-xs text-gray-400 mt-1">Disable multicast on OLT/MSAN</p>
                            </div>
                            <div class="bg-yellow-900/30 p-3 rounded-lg">
                                <p class="font-mono text-sm text-yellow-300">Huawei IPTV: SuspendSubscriber</p>
                                <p class="text-xs text-gray-400 mt-1">Block STB access on IPTV platform</p>
                                <p class="text-xs text-red-400 mt-1">UNDO: ResumeSubscriber</p>
                            </div>
                        </div>
                    </div>
                    <div class="bg-primary rounded-xl p-4 border-l-4 border-orange-500">
                        <h4 class="font-semibold text-orange-400 mb-2">Phase 4: Commit</h4>
                        <div class="bg-orange-900/30 p-3 rounded-lg">
                            <p class="font-mono text-sm text-orange-300">VC4.IPTV_SUSPEND</p>
                            <p class="text-xs text-gray-400 mt-1">Update inventory status to SUSPENDED</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- IPTV RESUME -->
            <div id="tab-iptv-resume" class="tab-content">
                <h3 class="text-xl font-semibold mb-4 text-blue-400">Resume IPTV Service</h3>
                <div class="space-y-4">
                    <div class="bg-primary rounded-xl p-4 border-l-4 border-blue-500">
                        <h4 class="font-semibold text-blue-400 mb-2">Phase 1: Validation</h4>
                        <p class="text-sm text-gray-400">Validate DN_NO, AREA_CODE</p>
                    </div>
                    <div class="bg-primary rounded-xl p-4 border-l-4 border-purple-500">
                        <h4 class="font-semibold text-purple-400 mb-2">Phase 2: D&A</h4>
                        <div class="bg-purple-900/30 p-3 rounded-lg">
                            <p class="font-mono text-sm text-purple-300">VC4.GET_LINE_FULL_DETAILS</p>
                            <p class="text-xs text-gray-400 mt-1">Fetch suspended IPTV config for restoration</p>
                        </div>
                    </div>
                    <div class="bg-primary rounded-xl p-4 border-l-4 border-green-500">
                        <h4 class="font-semibold text-green-400 mb-2">Phase 3: Provision</h4>
                        <div class="space-y-2">
                            <div class="bg-green-900/30 p-3 rounded-lg">
                                <p class="font-mono text-sm text-green-300">P&A.Resume IPTV Access</p>
                                <p class="text-xs text-gray-400 mt-1">Re-enable multicast on OLT/MSAN</p>
                            </div>
                            <div class="bg-green-900/30 p-3 rounded-lg">
                                <p class="font-mono text-sm text-green-300">Huawei IPTV: ResumeSubscriber</p>
                                <p class="text-xs text-gray-400 mt-1">Restore STB access with same package</p>
                                <p class="text-xs text-red-400 mt-1">UNDO: SuspendSubscriber</p>
                            </div>
                        </div>
                    </div>
                    <div class="bg-primary rounded-xl p-4 border-l-4 border-orange-500">
                        <h4 class="font-semibold text-orange-400 mb-2">Phase 4: Commit</h4>
                        <div class="bg-orange-900/30 p-3 rounded-lg">
                            <p class="font-mono text-sm text-orange-300">VC4.IPTV_RESUME</p>
                            <p class="text-xs text-gray-400 mt-1">Update inventory status to ACTIVE</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- IPTV TERMINATE -->
            <div id="tab-iptv-terminate" class="tab-content">
                <h3 class="text-xl font-semibold mb-4 text-red-400">Terminate IPTV Service</h3>
                <div class="space-y-4">
                    <div class="bg-primary rounded-xl p-4 border-l-4 border-blue-500">
                        <h4 class="font-semibold text-blue-400 mb-2">Phase 1: Validation</h4>
                        <p class="text-sm text-gray-400">Validate DN_NO, AREA_CODE, ACCOUNT_NO</p>
                    </div>
                    <div class="bg-primary rounded-xl p-4 border-l-4 border-purple-500">
                        <h4 class="font-semibold text-purple-400 mb-2">Phase 2: D&A</h4>
                        <div class="bg-purple-900/30 p-3 rounded-lg">
                            <p class="font-mono text-sm text-purple-300">VC4.GET_LINE_FULL_DETAILS</p>
                            <p class="text-xs text-gray-400 mt-1">Fetch all IPTV config for cleanup</p>
                        </div>
                    </div>
                    <div class="bg-primary rounded-xl p-4 border-l-4 border-red-500">
                        <h4 class="font-semibold text-red-400 mb-2">Phase 3: Provision</h4>
                        <div class="space-y-2">
                            <div class="bg-red-900/30 p-3 rounded-lg">
                                <p class="font-mono text-sm text-red-300">P&A.Delete IPTV Access</p>
                                <p class="text-xs text-gray-400 mt-1">Remove multicast config from OLT/MSAN</p>
                            </div>
                            <div class="bg-red-900/30 p-3 rounded-lg">
                                <p class="font-mono text-sm text-red-300">Huawei IPTV: DeleteSubscriber</p>
                                <p class="text-xs text-gray-400 mt-1">Deregister STB, remove entitlements</p>
                            </div>
                        </div>
                    </div>
                    <div class="bg-primary rounded-xl p-4 border-l-4 border-orange-500">
                        <h4 class="font-semibold text-orange-400 mb-2">Phase 4: Commit</h4>
                        <div class="bg-orange-900/30 p-3 rounded-lg">
                            <p class="font-mono text-sm text-orange-300">VC4.IPTV_DELETE_COMMIT</p>
                            <p class="text-xs text-gray-400 mt-1">Release resources, update inventory</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- IPTV Packages Info -->
            <div class="mt-6 p-4 bg-primary rounded-xl">
                <h4 class="font-semibold mb-3 text-purple-400">IPTV Packages & Components</h4>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div class="bg-purple-900/30 p-2 rounded text-center">
                        <p class="text-sm text-purple-300">Basic</p>
                        <p class="text-xs text-gray-400">30+ channels</p>
                    </div>
                    <div class="bg-purple-900/30 p-2 rounded text-center">
                        <p class="text-sm text-purple-300">Premium</p>
                        <p class="text-xs text-gray-400">100+ channels + VOD</p>
                    </div>
                    <div class="bg-purple-900/30 p-2 rounded text-center">
                        <p class="text-sm text-purple-300">Sports</p>
                        <p class="text-xs text-gray-400">BeIN Sports addon</p>
                    </div>
                    <div class="bg-purple-900/30 p-2 rounded text-center">
                        <p class="text-sm text-purple-300">Movies</p>
                        <p class="text-xs text-gray-400">OSN Movies addon</p>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Insert sections after overview
    overviewSection.after(ftthSection);
    ftthSection.after(voiceSection);
    voiceSection.after(iptvSection);

    // Re-initialize tabs for new sections
    setTimeout(() => initTabs(), 100);
}

/**
 * Load FlowOne Architecture Section
 */
function loadFlowOneArchitecture() {
    const catalogSection = document.getElementById('catalog');
    if (!catalogSection) return;

    const archSection = document.createElement('section');
    archSection.id = 'flowone-arch';
    archSection.className = 'mb-12 scroll-mt-8';
    archSection.innerHTML = `
        <div class="bg-secondary rounded-2xl p-6 shadow-xl">
            <h2 class="text-2xl font-bold mb-6 flex items-center">
                <i class="fas fa-server mr-3 text-blue-400"></i>FlowOne Infrastructure & Architecture
            </h2>

            <!-- Tab Navigation -->
            <div class="tab-container mb-6">
                <button class="tab-btn active" data-tab="infra-vms">VMs & Sites</button>
                <button class="tab-btn" data-tab="infra-sync">Sync/Async</button>
                <button class="tab-btn" data-tab="infra-engines">Task Engines</button>
                <button class="tab-btn" data-tab="infra-grc">GRC & Queues</button>
                <button class="tab-btn" data-tab="infra-relations">Component Relations</button>
            </div>

            <!-- VMs & Sites Tab -->
            <div id="tab-infra-vms" class="tab-content active">
                <!-- Instance-VM-Engine Relationship Diagram -->
                <div class="bg-primary rounded-xl p-4 mb-6">
                    <h3 class="font-semibold text-yellow-400 mb-4"><i class="fas fa-project-diagram mr-2"></i>Instance → VM → Task Engine Relationship</h3>
                    <div class="bg-gray-800 rounded-xl p-4">
                        <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 text-xs">
                            <!-- Network OM1 -->
                            <div class="bg-green-900/40 p-3 rounded-lg border border-green-600">
                                <h4 class="font-bold text-green-400 text-center mb-2">Network OM (OM1)</h4>
                                <p class="text-center text-gray-400 mb-2">Voice | Data | IPTV</p>
                                <div class="space-y-1 mb-3">
                                    <div class="bg-green-800/50 px-2 py-1 rounded text-center">LB: 2 VMs (2vCPU, 4GB)</div>
                                    <div class="bg-green-800/50 px-2 py-1 rounded text-center">App: 3 VMs (8vCPU, 12GB)</div>
                                    <div class="bg-green-800/50 px-2 py-1 rounded text-center">DB: 2 VMs (16vCPU, 160GB)</div>
                                    <div class="bg-green-800/50 px-2 py-1 rounded text-center">Archive: 2 VMs (14vCPU, 96GB)</div>
                                </div>
                                <div class="text-center">
                                    <i class="fas fa-arrow-down text-green-400"></i>
                                </div>
                            </div>
                            
                            <!-- IT OM2 -->
                            <div class="bg-blue-900/40 p-3 rounded-lg border border-blue-600">
                                <h4 class="font-bold text-blue-400 text-center mb-2">IT OM (OM2)</h4>
                                <p class="text-center text-gray-400 mb-2">B2B | Enterprise | SHDSL</p>
                                <div class="space-y-1 mb-3">
                                    <div class="bg-blue-800/50 px-2 py-1 rounded text-center">LB: 2 VMs (2vCPU, 4GB)</div>
                                    <div class="bg-blue-800/50 px-2 py-1 rounded text-center">App: 3 VMs (8vCPU, 24GB)</div>
                                    <div class="bg-blue-800/50 px-2 py-1 rounded text-center">DB: 2 VMs (16vCPU, 160GB)</div>
                                    <div class="bg-blue-800/50 px-2 py-1 rounded text-center">Archive: 2 VMs (15vCPU, 96GB)</div>
                                </div>
                                <div class="text-center">
                                    <i class="fas fa-arrow-down text-blue-400"></i>
                                </div>
                            </div>
                            
                            <!-- Common P&A -->
                            <div class="bg-purple-900/40 p-3 rounded-lg border border-purple-600">
                                <h4 class="font-bold text-purple-400 text-center mb-2">Common P&A</h4>
                                <p class="text-center text-gray-400 mb-2">Shared Provisioning</p>
                                <div class="space-y-1 mb-3">
                                    <div class="bg-purple-800/50 px-2 py-1 rounded text-center">LB: 2 VMs (2vCPU, 4GB)</div>
                                    <div class="bg-purple-800/50 px-2 py-1 rounded text-center">App: 3 VMs (12vCPU, 104GB)</div>
                                    <div class="bg-purple-800/50 px-2 py-1 rounded text-center">DB: 2 VMs (24vCPU, 160GB)</div>
                                    <div class="bg-purple-800/50 px-2 py-1 rounded text-center">Workflow: 2 VMs (6vCPU, 16GB)</div>
                                    <div class="bg-purple-800/50 px-2 py-1 rounded text-center">Prov Client: 2 VMs (8vCPU, 16GB)</div>
                                </div>
                                <div class="text-center">
                                    <i class="fas fa-arrow-down text-purple-400"></i>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Task Engine Flow -->
                        <div class="mt-4 bg-orange-900/40 p-3 rounded-lg border border-orange-600">
                            <h4 class="font-bold text-orange-400 text-center mb-2">Task Engines (Running on P&A VMs)</h4>
                            <div class="flex flex-wrap justify-center gap-2">
                                <span class="bg-orange-800/50 px-3 py-1 rounded">Orchestration Engine</span>
                                <span class="bg-orange-800/50 px-3 py-1 rounded">Activation Engine</span>
                                <span class="bg-orange-800/50 px-3 py-1 rounded">Workflow Engine</span>
                                <span class="bg-orange-800/50 px-3 py-1 rounded">Jeopardy Engine</span>
                                <span class="bg-orange-800/50 px-3 py-1 rounded">Fallout Engine</span>
                            </div>
                            <p class="text-center text-gray-400 mt-2 text-xs">All task engines share the P&A Application VMs (3 nodes cluster)</p>
                        </div>
                        
                        <!-- Flow arrows to NEIs -->
                        <div class="mt-4 text-center">
                            <i class="fas fa-arrow-down text-red-400 text-xl"></i>
                            <div class="bg-red-900/40 p-2 rounded-lg border border-red-600 mt-2">
                                <span class="text-red-400 font-semibold">Southbound NEIs</span>
                                <span class="text-gray-400 ml-2">(Huawei EMS | ZTE EMS | Nokia EMS | IPTV | Voice Core)</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <!-- Main Site -->
                    <div class="bg-primary rounded-xl p-4">
                        <h3 class="font-semibold text-green-400 mb-4"><i class="fas fa-building mr-2"></i>Main Site (OCT02)</h3>
                        <div class="space-y-3">
                            <div class="bg-green-900/30 p-3 rounded-lg">
                                <h4 class="font-semibold text-sm">Network OM Instance (OM1)</h4>
                                <p class="text-xs text-gray-400 mb-2">Services: Voice, Data, IPTV (B2C)</p>
                                <div class="grid grid-cols-2 gap-2 mt-2 text-xs">
                                    <span class="bg-gray-800 px-2 py-1 rounded">Load Balancer: 2 nodes</span>
                                    <span class="bg-gray-800 px-2 py-1 rounded">Deployment Node: 1</span>
                                    <span class="bg-gray-800 px-2 py-1 rounded">OM1 Application: 3 nodes</span>
                                    <span class="bg-gray-800 px-2 py-1 rounded">OM1 + Catalog DB: 2 nodes</span>
                                    <span class="bg-gray-800 px-2 py-1 rounded">Archive DB: 2 nodes</span>
                                    <span class="bg-gray-800 px-2 py-1 rounded">Catalog App: 2 nodes</span>
                                </div>
                            </div>
                            <div class="bg-blue-900/30 p-3 rounded-lg">
                                <h4 class="font-semibold text-sm">IT OM Instance (OM2)</h4>
                                <p class="text-xs text-gray-400 mb-2">Services: B2B, Enterprise, SHDSL, P2P</p>
                                <div class="grid grid-cols-2 gap-2 mt-2 text-xs">
                                    <span class="bg-gray-800 px-2 py-1 rounded">Load Balancer: 2 nodes</span>
                                    <span class="bg-gray-800 px-2 py-1 rounded">OM2 Application: 3 nodes</span>
                                    <span class="bg-gray-800 px-2 py-1 rounded">OM2 + Catalog DB: 2 nodes</span>
                                    <span class="bg-gray-800 px-2 py-1 rounded">Archive DB: 2 nodes</span>
                                </div>
                            </div>
                            <div class="bg-purple-900/30 p-3 rounded-lg">
                                <h4 class="font-semibold text-sm">Common P&A Instance</h4>
                                <p class="text-xs text-gray-400 mb-2">Shared by OM1 & OM2 → Runs Task Engines</p>
                                <div class="grid grid-cols-2 gap-2 mt-2 text-xs">
                                    <span class="bg-gray-800 px-2 py-1 rounded">Load Balancer: 2 nodes</span>
                                    <span class="bg-gray-800 px-2 py-1 rounded">P&A Application: 3 nodes</span>
                                    <span class="bg-gray-800 px-2 py-1 rounded">P&A + Catalog DB: 2 nodes</span>
                                    <span class="bg-gray-800 px-2 py-1 rounded">Workflow Client: 2 nodes</span>
                                    <span class="bg-gray-800 px-2 py-1 rounded">Provisioning Client: 2 nodes</span>
                                    <span class="bg-gray-800 px-2 py-1 rounded">Catalog App: 2 nodes</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- DR Site -->
                    <div class="bg-primary rounded-xl p-4">
                        <h3 class="font-semibold text-orange-400 mb-4"><i class="fas fa-shield-alt mr-2"></i>DR Site (AUTO)</h3>
                        <div class="space-y-3">
                            <div class="bg-orange-900/30 p-3 rounded-lg">
                                <h4 class="font-semibold text-sm">Mirrored Configuration</h4>
                                <p class="text-xs text-gray-400 mt-2">Same VM topology as Main Site for failover</p>
                                <ul class="text-xs mt-2 space-y-1">
                                    <li>• Active-Passive replication</li>
                                    <li>• Shared storage: 970 GB Ceph</li>
                                    <li>• Local storage: 4420 GB per site</li>
                                    <li>• Total vCPU: 92 per site</li>
                                    <li>• Total RAM: 448 GB per site</li>
                                </ul>
                            </div>
                        </div>
                        <div class="mt-4 bg-cyan-900/30 p-3 rounded-lg">
                            <h4 class="font-semibold text-sm text-cyan-400">Shared Storage Breakdown</h4>
                            <div class="grid grid-cols-2 gap-2 mt-2 text-xs">
                                <span class="bg-gray-800 px-2 py-1 rounded">Data: 100 GB</span>
                                <span class="bg-gray-800 px-2 py-1 rounded">Archive: 100 GB</span>
                                <span class="bg-gray-800 px-2 py-1 rounded">Redo: 2x20 GB</span>
                                <span class="bg-gray-800 px-2 py-1 rounded">OCRVOTE: 3x15 GB</span>
                                <span class="bg-gray-800 px-2 py-1 rounded">MGMTDB: 80 GB</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- VM Resources Table -->
                <div class="bg-primary rounded-xl p-4">
                    <h3 class="font-semibold text-cyan-400 mb-4"><i class="fas fa-microchip mr-2"></i>VM Resource Specs</h3>
                    <div class="overflow-x-auto">
                        <table class="ref-table w-full text-sm">
                            <thead>
                                <tr>
                                    <th>Component</th>
                                    <th>Nodes</th>
                                    <th>vCPU/Node</th>
                                    <th>RAM (GB)</th>
                                    <th>Disk (GB)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td>Load Balancer</td><td>2</td><td>2</td><td>4</td><td>16</td></tr>
                                <tr><td>Deployment Node</td><td>1</td><td>2</td><td>4</td><td>200</td></tr>
                                <tr><td>OM Application</td><td>3</td><td>8</td><td>12</td><td>280</td></tr>
                                <tr><td>OM + Catalog DB</td><td>2</td><td>16</td><td>160</td><td>796</td></tr>
                                <tr><td>P&A Application</td><td>3</td><td>12</td><td>104</td><td>3304</td></tr>
                                <tr><td>P&A + Catalog DB</td><td>2</td><td>24</td><td>160</td><td>7244</td></tr>
                                <tr><td>Provisioning Client</td><td>2</td><td>8</td><td>16</td><td>200</td></tr>
                                <tr><td>Workflow Client</td><td>2</td><td>6</td><td>16</td><td>200</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- Sync/Async Tab -->
            <div id="tab-infra-sync" class="tab-content">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <!-- Synchronous -->
                    <div class="bg-primary rounded-xl p-4 border-l-4 border-green-500">
                        <h3 class="font-semibold text-green-400 mb-4"><i class="fas fa-bolt mr-2"></i>Synchronous (SYNC)</h3>
                        <p class="text-sm text-gray-400 mb-3">Request waits for immediate response</p>
                        <div class="space-y-3">
                            <div class="bg-green-900/30 p-3 rounded-lg">
                                <h4 class="font-semibold text-sm">Use Cases</h4>
                                <ul class="text-xs mt-2 space-y-1">
                                    <li>• <strong>Feasibility</strong> - Check port availability</li>
                                    <li>• <strong>Get NAS Port ID</strong> - Retrieve port identifier</li>
                                    <li>• <strong>Check Eligibility</strong> - IPTV eligibility</li>
                                    <li>• <strong>Change Package Validation</strong> - Pre-check</li>
                                </ul>
                            </div>
                            <div class="bg-green-900/30 p-3 rounded-lg">
                                <h4 class="font-semibold text-sm">Flow</h4>
                                <div class="text-xs mt-2 font-mono bg-gray-800 p-2 rounded">
                                    BSS → SYNC Request → FlowOne<br>
                                    FlowOne → SYNC Response → BSS<br>
                                    <span class="text-green-400">Timeout: 60s (configurable)</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Asynchronous -->
                    <div class="bg-primary rounded-xl p-4 border-l-4 border-blue-500">
                        <h3 class="font-semibold text-blue-400 mb-4"><i class="fas fa-clock mr-2"></i>Asynchronous (ASYNC)</h3>
                        <p class="text-sm text-gray-400 mb-3">Request queued, callback on completion</p>
                        <div class="space-y-3">
                            <div class="bg-blue-900/30 p-3 rounded-lg">
                                <h4 class="font-semibold text-sm">Use Cases</h4>
                                <ul class="text-xs mt-2 space-y-1">
                                    <li>• <strong>Create</strong> - Provision new service</li>
                                    <li>• <strong>Terminate</strong> - Delete service</li>
                                    <li>• <strong>Suspend</strong> - Disable service</li>
                                    <li>• <strong>Resume</strong> - Re-enable service</li>
                                    <li>• <strong>Modify Package</strong> - Change speed/features</li>
                                </ul>
                            </div>
                            <div class="bg-blue-900/30 p-3 rounded-lg">
                                <h4 class="font-semibold text-sm">Flow</h4>
                                <div class="text-xs mt-2 font-mono bg-gray-800 p-2 rounded">
                                    BSS → ASYNC Request → FlowOne<br>
                                    FlowOne → <span class="text-yellow-400">ACK (immediate)</span> → BSS<br>
                                    FlowOne → [Processing...]<br>
                                    FlowOne → <span class="text-green-400">Callback Response</span> → BSS
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Request/Response Structure -->
                <div class="bg-primary rounded-xl p-4">
                    <h3 class="font-semibold text-purple-400 mb-4"><i class="fas fa-exchange-alt mr-2"></i>SOAP Request/Response Structure</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="bg-purple-900/30 p-3 rounded-lg">
                            <h4 class="font-semibold text-sm">Status Codes</h4>
                            <div class="text-xs mt-2 space-y-1">
                                <p><span class="text-green-400">Status=0</span> - Success</p>
                                <p><span class="text-yellow-400">Status=1,2,3</span> - Rejected, resend required</p>
                                <p><span class="text-red-400">Status=7,8</span> - Failure, re-execute</p>
                            </div>
                        </div>
                        <div class="bg-purple-900/30 p-3 rounded-lg">
                            <h4 class="font-semibold text-sm">Callback URL</h4>
                            <div class="text-xs mt-2">
                                <p class="text-gray-400">BSS provides callback URL in ASYNC requests</p>
                                <p class="font-mono bg-gray-800 px-2 py-1 rounded mt-1">CALLBACK_URL parameter</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Task Engines Tab -->
            <div id="tab-infra-engines" class="tab-content">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <!-- OM Task Engines -->
                    <div class="bg-primary rounded-xl p-4">
                        <h3 class="font-semibold text-blue-400 mb-4"><i class="fas fa-cog mr-2"></i>Order Management (OM) Engines</h3>
                        <div class="space-y-3">
                            <div class="bg-blue-900/30 p-3 rounded-lg">
                                <h4 class="font-semibold text-sm">Order Orchestration Engine</h4>
                                <p class="text-xs text-gray-400 mt-1">Decomposes CFS orders to RFS/TS tasks</p>
                                <ul class="text-xs mt-2 space-y-1">
                                    <li>• Order decomposition</li>
                                    <li>• Workflow sequencing</li>
                                    <li>• Dependency management</li>
                                </ul>
                            </div>
                            <div class="bg-blue-900/30 p-3 rounded-lg">
                                <h4 class="font-semibold text-sm">Jeopardy Engine</h4>
                                <p class="text-xs text-gray-400 mt-1">Monitors SLA and triggers alerts</p>
                                <ul class="text-xs mt-2 space-y-1">
                                    <li>• SLA tracking</li>
                                    <li>• Escalation triggers</li>
                                    <li>• Age-based monitoring</li>
                                </ul>
                            </div>
                            <div class="bg-blue-900/30 p-3 rounded-lg">
                                <h4 class="font-semibold text-sm">Fallout Engine</h4>
                                <p class="text-xs text-gray-400 mt-1">Handles task failures</p>
                                <ul class="text-xs mt-2 space-y-1">
                                    <li>• IGNORE / RETRY / ROLLBACK</li>
                                    <li>• STOP / Order Hub escalation</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <!-- P&A Task Engines -->
                    <div class="bg-primary rounded-xl p-4">
                        <h3 class="font-semibold text-green-400 mb-4"><i class="fas fa-network-wired mr-2"></i>Provisioning & Activation (P&A) Engines</h3>
                        <div class="space-y-3">
                            <div class="bg-green-900/30 p-3 rounded-lg">
                                <h4 class="font-semibold text-sm">Activation Engine</h4>
                                <p class="text-xs text-gray-400 mt-1">Executes provisioning tasks on NEIs</p>
                                <ul class="text-xs mt-2 space-y-1">
                                    <li>• EMS/NEI communication</li>
                                    <li>• TL script execution</li>
                                    <li>• Configuration push</li>
                                </ul>
                            </div>
                            <div class="bg-green-900/30 p-3 rounded-lg">
                                <h4 class="font-semibold text-sm">Workflow Client Engine</h4>
                                <p class="text-xs text-gray-400 mt-1">Manages workflow execution</p>
                                <ul class="text-xs mt-2 space-y-1">
                                    <li>• Task state management</li>
                                    <li>• Transaction coordination</li>
                                    <li>• Rollback orchestration</li>
                                </ul>
                            </div>
                            <div class="bg-green-900/30 p-3 rounded-lg">
                                <h4 class="font-semibold text-sm">Provisioning Client Engine</h4>
                                <p class="text-xs text-gray-400 mt-1">Southbound protocol handling</p>
                                <ul class="text-xs mt-2 space-y-1">
                                    <li>• SOAP/REST adapters</li>
                                    <li>• CLI/TL1 adapters</li>
                                    <li>• Connection pooling</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Engine Flow Diagram -->
                <div class="bg-primary rounded-xl p-4">
                    <h3 class="font-semibold text-purple-400 mb-4"><i class="fas fa-project-diagram mr-2"></i>Engine Processing Flow</h3>
                    <div class="flex flex-wrap items-center justify-center gap-2 text-xs">
                        <span class="bg-blue-900 px-3 py-2 rounded">Northbound Request</span>
                        <i class="fas fa-arrow-right text-gray-500"></i>
                        <span class="bg-blue-700 px-3 py-2 rounded">OM Orchestration</span>
                        <i class="fas fa-arrow-right text-gray-500"></i>
                        <span class="bg-purple-700 px-3 py-2 rounded">Task Queue</span>
                        <i class="fas fa-arrow-right text-gray-500"></i>
                        <span class="bg-green-700 px-3 py-2 rounded">P&A Activation</span>
                        <i class="fas fa-arrow-right text-gray-500"></i>
                        <span class="bg-orange-700 px-3 py-2 rounded">NEI/EMS</span>
                    </div>
                </div>
            </div>

            <!-- GRC & Queues Tab -->
            <div id="tab-infra-grc" class="tab-content">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <!-- GRC Parameters -->
                    <div class="bg-primary rounded-xl p-4">
                        <h3 class="font-semibold text-yellow-400 mb-4"><i class="fas fa-sliders-h mr-2"></i>GRC Parameters</h3>
                        <p class="text-xs text-gray-400 mb-3">Global Runtime Configuration - System-wide settings</p>
                        <div class="space-y-3">
                            <div class="bg-yellow-900/30 p-3 rounded-lg">
                                <h4 class="font-semibold text-sm">Timeout Parameters</h4>
                                <div class="grid grid-cols-2 gap-2 mt-2 text-xs">
                                    <span class="bg-gray-800 px-2 py-1 rounded">SYNC_TIMEOUT: 60s</span>
                                    <span class="bg-gray-800 px-2 py-1 rounded">ASYNC_TIMEOUT: 300s</span>
                                    <span class="bg-gray-800 px-2 py-1 rounded">NEI_TIMEOUT: 30s</span>
                                    <span class="bg-gray-800 px-2 py-1 rounded">DB_TIMEOUT: 10s</span>
                                </div>
                            </div>
                            <div class="bg-yellow-900/30 p-3 rounded-lg">
                                <h4 class="font-semibold text-sm">Retry Parameters</h4>
                                <div class="grid grid-cols-2 gap-2 mt-2 text-xs">
                                    <span class="bg-gray-800 px-2 py-1 rounded">MAX_RETRIES: 3</span>
                                    <span class="bg-gray-800 px-2 py-1 rounded">RETRY_INTERVAL: 60s</span>
                                    <span class="bg-gray-800 px-2 py-1 rounded">BACKOFF_MULTIPLIER: 2</span>
                                </div>
                            </div>
                            <div class="bg-yellow-900/30 p-3 rounded-lg">
                                <h4 class="font-semibold text-sm">Capacity Parameters</h4>
                                <div class="grid grid-cols-2 gap-2 mt-2 text-xs">
                                    <span class="bg-gray-800 px-2 py-1 rounded">MAX_CONCURRENT: 100</span>
                                    <span class="bg-gray-800 px-2 py-1 rounded">QUEUE_SIZE: 10000</span>
                                    <span class="bg-gray-800 px-2 py-1 rounded">THREAD_POOL: 50</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Queues -->
                    <div class="bg-primary rounded-xl p-4">
                        <h3 class="font-semibold text-cyan-400 mb-4"><i class="fas fa-stream mr-2"></i>Message Queues</h3>
                        <p class="text-xs text-gray-400 mb-3">JMS queues for asynchronous processing</p>
                        <div class="space-y-3">
                            <div class="bg-cyan-900/30 p-3 rounded-lg">
                                <h4 class="font-semibold text-sm">OM Queues</h4>
                                <ul class="text-xs mt-2 space-y-1">
                                    <li>• <span class="text-cyan-300">OM_INBOUND_Q</span> - Incoming orders</li>
                                    <li>• <span class="text-cyan-300">OM_OUTBOUND_Q</span> - Responses</li>
                                    <li>• <span class="text-cyan-300">OM_CALLBACK_Q</span> - Async callbacks</li>
                                    <li>• <span class="text-cyan-300">OM_DLQ</span> - Dead letter queue</li>
                                </ul>
                            </div>
                            <div class="bg-cyan-900/30 p-3 rounded-lg">
                                <h4 class="font-semibold text-sm">P&A Queues</h4>
                                <ul class="text-xs mt-2 space-y-1">
                                    <li>• <span class="text-cyan-300">PA_TASK_Q</span> - Provisioning tasks</li>
                                    <li>• <span class="text-cyan-300">PA_RESPONSE_Q</span> - NEI responses</li>
                                    <li>• <span class="text-cyan-300">PA_FALLOUT_Q</span> - Failed tasks</li>
                                    <li>• <span class="text-cyan-300">PA_PRIORITY_Q</span> - High priority</li>
                                </ul>
                            </div>
                            <div class="bg-cyan-900/30 p-3 rounded-lg">
                                <h4 class="font-semibold text-sm">Integration Queues</h4>
                                <ul class="text-xs mt-2 space-y-1">
                                    <li>• <span class="text-cyan-300">VC4_REQUEST_Q</span> - Inventory</li>
                                    <li>• <span class="text-cyan-300">EMS_REQUEST_Q</span> - Network elements</li>
                                    <li>• <span class="text-cyan-300">IPTV_REQUEST_Q</span> - IPTV platform</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Fallout Lookup -->
                <div class="bg-primary rounded-xl p-4">
                    <h3 class="font-semibold text-red-400 mb-4"><i class="fas fa-exclamation-triangle mr-2"></i>LOOKUP_FALLOUT Configuration</h3>
                    <div class="overflow-x-auto">
                        <table class="ref-table w-full text-sm">
                            <thead>
                                <tr>
                                    <th>Error Type</th>
                                    <th>Action</th>
                                    <th>Max Retries</th>
                                    <th>Escalation</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td>CONNECTION_TIMEOUT</td><td class="text-yellow-400">RETRY</td><td>3</td><td>Order Hub</td></tr>
                                <tr><td>VALIDATION_ERROR</td><td class="text-red-400">STOP</td><td>0</td><td>Immediate</td></tr>
                                <tr><td>RESOURCE_BUSY</td><td class="text-yellow-400">RETRY</td><td>5</td><td>After retries</td></tr>
                                <tr><td>NEI_UNREACHABLE</td><td class="text-orange-400">ROLLBACK</td><td>0</td><td>Order Hub</td></tr>
                                <tr><td>DATA_MISMATCH</td><td class="text-gray-400">IGNORE</td><td>-</td><td>Log only</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- Component Relations Tab -->
            <div id="tab-infra-relations" class="tab-content">
                <div class="bg-primary rounded-xl p-4 mb-6">
                    <h3 class="font-semibold text-purple-400 mb-4"><i class="fas fa-project-diagram mr-2"></i>System Component Relations</h3>
                    
                    <!-- Architecture Diagram -->
                    <div class="bg-gray-800 rounded-xl p-4 mb-4">
                        <div class="grid grid-cols-5 gap-2 text-center text-xs">
                            <!-- Row 1: Northbound -->
                            <div class="col-span-5 bg-green-900/50 p-3 rounded-lg mb-2">
                                <p class="font-semibold text-green-400 mb-2">NORTHBOUND (BSS/OSS)</p>
                                <div class="flex justify-center gap-2 flex-wrap">
                                    <span class="bg-green-800 px-2 py-1 rounded">Huawei SOM</span>
                                    <span class="bg-green-800 px-2 py-1 rounded">BSS/CRM</span>
                                    <span class="bg-green-800 px-2 py-1 rounded">ADSL Portal</span>
                                    <span class="bg-green-800 px-2 py-1 rounded">KAM Portal</span>
                                </div>
                            </div>
                            
                            <!-- Row 2: Middleware 11 -->
                            <div class="col-span-5 bg-orange-900/50 p-3 rounded-lg mb-2">
                                <p class="font-semibold text-orange-400 mb-2">MIDDLEWARE 11 (Integration Layer)</p>
                                <div class="flex justify-center gap-2 flex-wrap">
                                    <span class="bg-orange-800 px-2 py-1 rounded">API Gateway</span>
                                    <span class="bg-orange-800 px-2 py-1 rounded">Message Queue</span>
                                    <span class="bg-orange-800 px-2 py-1 rounded">SOAP/REST Adapter</span>
                                    <span class="bg-orange-800 px-2 py-1 rounded">Auth & Security</span>
                                </div>
                            </div>
                            
                            <!-- Row 3: FlowOne -->
                            <div class="col-span-5 bg-blue-900/50 p-3 rounded-lg mb-2">
                                <p class="font-semibold text-blue-400 mb-2">NOKIA FLOWONE</p>
                                <div class="grid grid-cols-3 gap-2">
                                    <div class="bg-blue-800 p-2 rounded">
                                        <p class="font-semibold">OM</p>
                                        <p class="text-gray-400">Order Management</p>
                                    </div>
                                    <div class="bg-blue-800 p-2 rounded">
                                        <p class="font-semibold">P&A</p>
                                        <p class="text-gray-400">Provisioning</p>
                                    </div>
                                    <div class="bg-blue-800 p-2 rounded">
                                        <p class="font-semibold">Catalog</p>
                                        <p class="text-gray-400">Service Specs</p>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Row 4: Inventory -->
                            <div class="col-span-5 bg-purple-900/50 p-3 rounded-lg mb-2">
                                <p class="font-semibold text-purple-400 mb-2">INVENTORY (VC4)</p>
                                <div class="flex justify-center gap-2 flex-wrap">
                                    <span class="bg-purple-800 px-2 py-1 rounded">Resource DB</span>
                                    <span class="bg-purple-800 px-2 py-1 rounded">Port Management</span>
                                    <span class="bg-purple-800 px-2 py-1 rounded">VLAN Allocation</span>
                                    <span class="bg-purple-800 px-2 py-1 rounded">Service Status</span>
                                </div>
                            </div>
                            
                            <!-- Row 5: Southbound -->
                            <div class="col-span-5 bg-red-900/50 p-3 rounded-lg">
                                <p class="font-semibold text-red-400 mb-2">SOUTHBOUND (NEIs/EMS)</p>
                                <div class="flex justify-center gap-2 flex-wrap">
                                    <span class="bg-red-800 px-2 py-1 rounded">Huawei EMS</span>
                                    <span class="bg-red-800 px-2 py-1 rounded">ZTE EMS</span>
                                    <span class="bg-red-800 px-2 py-1 rounded">Nokia EMS</span>
                                    <span class="bg-red-800 px-2 py-1 rounded">IPTV Platform</span>
                                    <span class="bg-red-800 px-2 py-1 rounded">Voice Core</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Integration Points -->
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div class="bg-green-900/30 p-3 rounded-lg">
                            <h4 class="font-semibold text-sm text-green-400">Northbound APIs</h4>
                            <ul class="text-xs mt-2 space-y-1">
                                <li>• SOAP Web Services</li>
                                <li>• InstantLink binding</li>
                                <li>• Callback mechanisms</li>
                            </ul>
                        </div>
                        <div class="bg-purple-900/30 p-3 rounded-lg">
                            <h4 class="font-semibold text-sm text-purple-400">Westbound (VC4)</h4>
                            <ul class="text-xs mt-2 space-y-1">
                                <li>• REST API</li>
                                <li>• GET_LINE_DETAILS</li>
                                <li>• RESERVE/COMMIT</li>
                            </ul>
                        </div>
                        <div class="bg-red-900/30 p-3 rounded-lg">
                            <h4 class="font-semibold text-sm text-red-400">Southbound (NEI)</h4>
                            <ul class="text-xs mt-2 space-y-1">
                                <li>• SOAP/REST</li>
                                <li>• CLI/TL1</li>
                                <li>• SNMP</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    catalogSection.after(archSection);
    setTimeout(() => initTabs(), 100);
}

/**
 * Load Products Section
 */
function loadProductsSection() {
    const falloutSection = document.getElementById('fallout');
    if (!falloutSection) return;

    const productsSection = document.createElement('section');
    productsSection.id = 'products';
    productsSection.className = 'mb-12 scroll-mt-8';
    productsSection.innerHTML = `
        <div class="bg-secondary rounded-2xl p-6 shadow-xl">
            <h2 class="text-2xl font-bold mb-6 flex items-center">
                <i class="fas fa-box mr-3 text-cyan-400"></i>Products & Product Actions
            </h2>

            <!-- Products Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <!-- Data Products -->
                <div class="bg-gradient-to-br from-green-900/50 to-green-800/30 rounded-xl p-4 border border-green-700">
                    <h3 class="font-semibold text-green-400 mb-3"><i class="fas fa-wifi mr-2"></i>Data Products</h3>
                    <ul class="text-sm space-y-2">
                        <li class="flex justify-between"><span>ADSL</span><span class="text-gray-400">30/70 Mbps</span></li>
                        <li class="flex justify-between"><span>VDSL</span><span class="text-gray-400">100/200 Mbps</span></li>
                        <li class="flex justify-between"><span>FTTH B2C</span><span class="text-gray-400">100-1000 Mbps</span></li>
                        <li class="flex justify-between"><span>SHDSL (B2B)</span><span class="text-gray-400">Symmetric</span></li>
                        <li class="flex justify-between"><span>Point-to-Point</span><span class="text-gray-400">Dedicated</span></li>
                        <li class="flex justify-between"><span>GPON FTTH</span><span class="text-gray-400">Shared fiber</span></li>
                    </ul>
                </div>

                <!-- Voice Products -->
                <div class="bg-gradient-to-br from-blue-900/50 to-blue-800/30 rounded-xl p-4 border border-blue-700">
                    <h3 class="font-semibold text-blue-400 mb-3"><i class="fas fa-phone mr-2"></i>Voice Products</h3>
                    <ul class="text-sm space-y-2">
                        <li class="flex justify-between"><span>SIP</span><span class="text-gray-400">H.248/SIP</span></li>
                        <li class="flex justify-between"><span>FTTH Voice</span><span class="text-gray-400">VoIP over fiber</span></li>
                        <li class="flex justify-between"><span>FVNO</span><span class="text-gray-400">Wholesale</span></li>
                        <li class="flex justify-between"><span>PRI</span><span class="text-gray-400">Enterprise</span></li>
                        <li class="flex justify-between"><span>FXO/FXS</span><span class="text-gray-400">Analog</span></li>
                        <li class="flex justify-between"><span>Fixed Voice Roaming</span><span class="text-gray-400">Mobile integration</span></li>
                    </ul>
                </div>

                <!-- IPTV & VAS -->
                <div class="bg-gradient-to-br from-purple-900/50 to-purple-800/30 rounded-xl p-4 border border-purple-700">
                    <h3 class="font-semibold text-purple-400 mb-3"><i class="fas fa-tv mr-2"></i>IPTV & VAS</h3>
                    <ul class="text-sm space-y-2">
                        <li class="flex justify-between"><span>IPTV Basic</span><span class="text-gray-400">Standard channels</span></li>
                        <li class="flex justify-between"><span>IPTV Premium</span><span class="text-gray-400">HD + Sports</span></li>
                        <li class="flex justify-between"><span>Option Pack</span><span class="text-gray-400">Add-on features</span></li>
                        <li class="flex justify-between"><span>Static IP</span><span class="text-gray-400">VAS</span></li>
                        <li class="flex justify-between"><span>Speed Boost</span><span class="text-gray-400">VAS</span></li>
                    </ul>
                </div>
            </div>

            <!-- Product Actions -->
            <div class="bg-primary rounded-xl p-4">
                <h3 class="font-semibold text-orange-400 mb-4"><i class="fas fa-cogs mr-2"></i>Product Actions (Transactions)</h3>
                <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    <div class="bg-green-900/50 p-3 rounded-lg text-center">
                        <i class="fas fa-plus-circle text-2xl text-green-400 mb-2"></i>
                        <p class="text-sm font-semibold">Create</p>
                        <p class="text-xs text-gray-400">New service</p>
                    </div>
                    <div class="bg-red-900/50 p-3 rounded-lg text-center">
                        <i class="fas fa-times-circle text-2xl text-red-400 mb-2"></i>
                        <p class="text-sm font-semibold">Terminate</p>
                        <p class="text-xs text-gray-400">Delete service</p>
                    </div>
                    <div class="bg-yellow-900/50 p-3 rounded-lg text-center">
                        <i class="fas fa-pause-circle text-2xl text-yellow-400 mb-2"></i>
                        <p class="text-sm font-semibold">Suspend</p>
                        <p class="text-xs text-gray-400">Temp disable</p>
                    </div>
                    <div class="bg-blue-900/50 p-3 rounded-lg text-center">
                        <i class="fas fa-play-circle text-2xl text-blue-400 mb-2"></i>
                        <p class="text-sm font-semibold">Resume</p>
                        <p class="text-xs text-gray-400">Re-enable</p>
                    </div>
                    <div class="bg-purple-900/50 p-3 rounded-lg text-center">
                        <i class="fas fa-exchange-alt text-2xl text-purple-400 mb-2"></i>
                        <p class="text-sm font-semibold">Modify</p>
                        <p class="text-xs text-gray-400">Change package</p>
                    </div>
                    <div class="bg-cyan-900/50 p-3 rounded-lg text-center">
                        <i class="fas fa-search text-2xl text-cyan-400 mb-2"></i>
                        <p class="text-sm font-semibold">Feasibility</p>
                        <p class="text-xs text-gray-400">Check availability</p>
                    </div>
                </div>
            </div>
        </div>
    `;

    falloutSection.after(productsSection);
}

/**
 * Enhanced Linux Cheat Sheet - Telecom Specific
 */
function loadEnhancedLinuxCheatSheet() {
    const linuxSection = document.getElementById('linux-admin');
    if (!linuxSection) return;

    // Add telecom-specific tab
    const tabContainer = linuxSection.querySelector('.tab-container');
    if (tabContainer) {
        const telecomTab = document.createElement('button');
        telecomTab.className = 'tab-btn';
        telecomTab.dataset.tab = 'telecom-ops';
        telecomTab.textContent = 'Telecom Ops';
        tabContainer.appendChild(telecomTab);
    }

    // Add telecom ops content
    const tabContent = document.createElement('div');
    tabContent.id = 'tab-telecom-ops';
    tabContent.className = 'tab-content';
    tabContent.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="cheat-sheet-card p-4 rounded-xl">
                <h4 class="font-semibold text-cyan-400 mb-3"><i class="fas fa-terminal mr-2"></i>FlowOne Log Analysis</h4>
                <div class="code-block">
                    <code>
<span class="comment"># Check FlowOne application logs</span>
tail -f /opt/nokia/flowone/logs/om.log
tail -f /opt/nokia/flowone/logs/pa.log

<span class="comment"># Search for order failures</span>
grep -i "ERROR\\|FAILED" /opt/nokia/flowone/logs/*.log

<span class="comment"># Find orders by DN</span>
grep "DN_NO=0123456789" /opt/nokia/flowone/logs/om.log

<span class="comment"># Count orders per hour</span>
grep "$(date +%Y-%m-%d)" om.log | cut -d' ' -f2 | cut -d: -f1 | sort | uniq -c
                    </code>
                </div>
            </div>

            <div class="cheat-sheet-card p-4 rounded-xl">
                <h4 class="font-semibold text-green-400 mb-3"><i class="fas fa-clock mr-2"></i>Cron Jobs for Telecom</h4>
                <div class="code-block">
                    <code>
<span class="comment"># Daily log rotation (2am)</span>
0 2 * * * /opt/scripts/rotate_logs.sh

<span class="comment"># Hourly order status check</span>
0 * * * * /opt/scripts/check_stuck_orders.sh

<span class="comment"># Every 5 min: NEI health check</span>
*/5 * * * * /opt/scripts/nei_health.sh

<span class="comment"># Weekly DB cleanup (Sunday 3am)</span>
0 3 * * 0 /opt/scripts/archive_old_orders.sh

<span class="comment"># View active crons</span>
crontab -l
                    </code>
                </div>
            </div>

            <div class="cheat-sheet-card p-4 rounded-xl">
                <h4 class="font-semibold text-orange-400 mb-3"><i class="fas fa-globe mr-2"></i>curl Commands for APIs</h4>
                <div class="code-block">
                    <code>
<span class="comment"># Check FlowOne health</span>
curl -X GET http://localhost:8080/health

<span class="comment"># Send order to FlowOne (async)</span>
curl -X POST http://flowone:8080/api/order \\
  -H "Content-Type: application/json" \\
  -d '{"action":"CREATE","dn_no":"0123456789"}'

<span class="comment"># Check VC4 status</span>
curl -X GET "http://vc4:8080/api/line?dn=0123456789"

<span class="comment"># Test EMS connectivity</span>
curl -v telnet://ems-host:3083 --connect-timeout 5
                    </code>
                </div>
            </div>

            <div class="cheat-sheet-card p-4 rounded-xl">
                <h4 class="font-semibold text-purple-400 mb-3"><i class="fas fa-database mr-2"></i>DB Connectivity</h4>
                <div class="code-block">
                    <code>
<span class="comment"># Test Oracle connection</span>
sqlplus user/pass@//host:1521/SID

<span class="comment"># Quick query from shell</span>
echo "SELECT COUNT(*) FROM ORDERS;" | sqlplus -s user/pass@SID

<span class="comment"># Export query to file</span>
sqlplus -s user/pass@SID << EOF
SET HEADING OFF
SPOOL /tmp/output.csv
SELECT order_id,status FROM orders WHERE status='FAILED';
SPOOL OFF
EOF

<span class="comment"># Check DB listener</span>
tnsping FLOWONE_DB
                    </code>
                </div>
            </div>
        </div>

        <div class="memory-card mt-6">
            <h4><i class="fas fa-brain mr-2"></i>Memory Aid: Log Locations</h4>
            <p class="mnemonic">/opt/nokia/flowone/logs/ → OM, P&A, Catalog logs</p>
            <p class="text-sm text-gray-400 mt-2">/var/log/messages → System | /var/log/oracle → DB</p>
        </div>
    `;
    
    const existingContent = linuxSection.querySelector('#tab-troubleshoot');
    if (existingContent) {
        existingContent.after(tabContent);
    }
}

// Call enhanced loader after main cheat sheets
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        loadEnhancedLinuxCheatSheet();
        loadEnhancedOracleCheatSheet();
    }, 200);
});

/**
 * Enhanced Oracle Cheat Sheet - Telecom Specific
 */
function loadEnhancedOracleCheatSheet() {
    const oracleSection = document.getElementById('oracle-admin');
    if (!oracleSection) return;

    // Add new content after existing oracle section
    const enhancedContent = document.createElement('div');
    enhancedContent.className = 'mt-6';
    enhancedContent.innerHTML = `
        <h3 class="text-xl font-semibold mb-4 text-cyan-400"><i class="fas fa-database mr-2"></i>FlowOne Database Operations</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div class="cheat-sheet-card p-4 rounded-xl">
                <h4 class="font-semibold text-blue-400 mb-3"><i class="fas fa-search mr-2"></i>Order Queries</h4>
                <div class="code-block">
                    <code>
<span class="comment">-- Find stuck orders</span>
SELECT ORDER_ID, STATUS, CREATED_DATE
FROM OM_ORDERS
WHERE STATUS = 'IN_PROGRESS'
AND CREATED_DATE < SYSDATE - 1;

<span class="comment">-- Order count by status</span>
SELECT STATUS, COUNT(*) as CNT
FROM OM_ORDERS
WHERE CREATED_DATE > SYSDATE - 7
GROUP BY STATUS;

<span class="comment">-- Find order by DN</span>
SELECT * FROM OM_ORDERS
WHERE DN_NO = '0123456789'
ORDER BY CREATED_DATE DESC;

<span class="comment">-- Failed orders last 24h</span>
SELECT ORDER_ID, ERROR_CODE, ERROR_MSG
FROM OM_ORDERS
WHERE STATUS = 'FAILED'
AND CREATED_DATE > SYSDATE - 1;
                    </code>
                </div>
            </div>

            <div class="cheat-sheet-card p-4 rounded-xl">
                <h4 class="font-semibold text-green-400 mb-3"><i class="fas fa-sync mr-2"></i>Retry & Cleanup</h4>
                <div class="code-block">
                    <code>
<span class="comment">-- Reset stuck order for retry</span>
UPDATE OM_ORDERS
SET STATUS = 'PENDING',
    RETRY_COUNT = 0,
    MODIFIED_DATE = SYSDATE
WHERE ORDER_ID = 'ORD123456';
COMMIT;

<span class="comment">-- Archive old completed orders</span>
INSERT INTO OM_ORDERS_ARCHIVE
SELECT * FROM OM_ORDERS
WHERE STATUS = 'COMPLETED'
AND CREATED_DATE < SYSDATE - 90;

DELETE FROM OM_ORDERS
WHERE STATUS = 'COMPLETED'
AND CREATED_DATE < SYSDATE - 90;
COMMIT;

<span class="comment">-- Purge workflow history</span>
DELETE FROM WF_HISTORY
WHERE END_TIME < SYSDATE - 30;
                    </code>
                </div>
            </div>

            <div class="cheat-sheet-card p-4 rounded-xl">
                <h4 class="font-semibold text-purple-400 mb-3"><i class="fas fa-chart-bar mr-2"></i>Performance Queries</h4>
                <div class="code-block">
                    <code>
<span class="comment">-- Avg order processing time</span>
SELECT ROUND(AVG(
  (COMPLETED_DATE - CREATED_DATE) * 24 * 60
), 2) AS AVG_MINUTES
FROM OM_ORDERS
WHERE STATUS = 'COMPLETED'
AND CREATED_DATE > SYSDATE - 1;

<span class="comment">-- Orders per hour today</span>
SELECT TO_CHAR(CREATED_DATE, 'HH24') AS HOUR,
       COUNT(*) AS ORDER_COUNT
FROM OM_ORDERS
WHERE TRUNC(CREATED_DATE) = TRUNC(SYSDATE)
GROUP BY TO_CHAR(CREATED_DATE, 'HH24')
ORDER BY HOUR;

<span class="comment">-- Top error codes</span>
SELECT ERROR_CODE, COUNT(*) AS CNT
FROM OM_ORDERS
WHERE STATUS = 'FAILED'
GROUP BY ERROR_CODE
ORDER BY CNT DESC
FETCH FIRST 10 ROWS ONLY;
                    </code>
                </div>
            </div>

            <div class="cheat-sheet-card p-4 rounded-xl">
                <h4 class="font-semibold text-orange-400 mb-3"><i class="fas fa-cog mr-2"></i>Admin Tasks</h4>
                <div class="code-block">
                    <code>
<span class="comment">-- Check tablespace usage</span>
SELECT TABLESPACE_NAME,
       ROUND(USED_SPACE * 8192 / 1024 / 1024) AS USED_MB,
       ROUND(TABLESPACE_SIZE * 8192 / 1024 / 1024) AS TOTAL_MB
FROM DBA_TABLESPACE_USAGE_METRICS;

<span class="comment">-- Kill blocking session</span>
SELECT SID, SERIAL#, USERNAME, STATUS
FROM V$SESSION
WHERE BLOCKING_SESSION IS NOT NULL;

ALTER SYSTEM KILL SESSION 'sid,serial#' IMMEDIATE;

<span class="comment">-- Rebuild index</span>
ALTER INDEX IDX_ORDERS_DN REBUILD ONLINE;

<span class="comment">-- Gather stats</span>
EXEC DBMS_STATS.GATHER_TABLE_STATS('FLOWONE','OM_ORDERS');
                    </code>
                </div>
            </div>
        </div>

        <div class="memory-card">
            <h4><i class="fas fa-brain mr-2"></i>Memory Aid: Key Tables</h4>
            <p class="mnemonic">OM_ORDERS → PA_TASKS → WF_HISTORY</p>
            <p class="text-sm text-gray-400 mt-2">Order Management → Provisioning Tasks → Workflow History</p>
        </div>
    `;
    
    const existingCard = oracleSection.querySelector('.bg-secondary');
    if (existingCard) {
        existingCard.appendChild(enhancedContent);
    }
}
