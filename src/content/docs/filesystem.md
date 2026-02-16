---
title: "Unix file system, simplified"
description: "A concise, agent-friendly walkthrough of how Unix-like operating systems store, name, and share data."
source: "/filesystem.md"
---

## Quick facts

- Core OS component first implemented by Ken Thompson in 1969.
- Everything lives in a single rooted tree at `/`; extra volumes get mounted onto directories.
- Directories map names to inodes that hold data and metadata; hard links let multiple names point to one inode.
- Early Unix often mounted a second disk at `/usr` to merge startup tools and user space.

## Principles

The filesystem provides storage plus a communication layer: small programs write files that others read, with pipes complementing that flow. Device files expose terminals, printers, and other hardware through the same interface. The layout remains one tree even when files live on other partitions, removable media, or network shares.

## File types

- Regular files and directories.
- Device files for hardware entry points.
- Sockets and FIFO files for interprocess communication.
- Symbolic links that reference other paths, even across filesystems.

## Conventional directory layout

- `/` — Root of the tree.
- `/bin` — Essential binaries available even in single-user mode.
- `/boot` — Files needed to start the system.
- `/dev` — Device files for hardware and pseudo-devices.
- `/etc` — System-wide configuration.
- `/home` — User home directories on many systems.
- `/lib` — Shared libraries needed by core binaries.
- `/opt` — Optional or locally installed software.
- `/proc` — Virtual process info (procfs).
- `/root` — Home directory for the superuser.
- `/sbin` — System binaries for startup and recovery.
- `/tmp` — Temporary files not expected to survive reboot.
- `/usr` — Executables, libraries, headers, and shared resources that are not system-critical.
- `/var` — Data that changes frequently: logs, mail, spools, caches, and long-lived temp files.

## System notes

File systems manage how applications share storage, whether on disks, SSDs, tapes, optical media, or RAM disks such as `tmpfs`. Distributed file systems extend the model across networked machines. Virtual file systems expose computed data, like `procfs` and `sysfs`, through the same path-based interface.

## See also

- Filesystem Hierarchy Standard (FHS)
- ext2, ext3, ext4, Btrfs, ZFS, HAMMER, JFS, Veritas File System, Unix File System (UFS)
- Source: [Intro Unix text on file systems](https://homepages.uc.edu/~thomam/Intro_Unix_Text/File_System.html)
