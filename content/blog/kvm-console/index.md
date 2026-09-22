+++
title = "Enable Console Login on a KVM Guest"
date = "2026-02-20"
description = "How to configure a guest when console login is not available"

[taxonomies]
tags = ["Kvm", "Linux"]
+++

KVM provides a feature to log in to a guest via the console. However, if the guest itself is not configured to allow console login, you will not be able to perform any operations even after connecting.

In particular, when the guest OS network settings are not yet configured, having console login available is very helpful (since you cannot connect via SSH to configure it).

Below are the steps to configure a KVM guest.

## Environment

- KVM host OS : Rocky Linux 9 (upgraded from CentOS 8)
- Bootloader : grub2

The KVM environment in use is built on RHEL clone (the KVM server runs on Rocky 9 : upgraded from CentOS), and the guests also use RHEL clone.  
Instead of installing OS from scratch every time, a base image is created in advance. When creating a new KVM guest, this base image is cloned.  

By enabling console login in the base image, all cloned guests will also support console login.

*Note:* This procedure works with RHEL 7 and later. Earlier versions use `grub` instead of `grub2`, so the steps are different.  
*Note:* This article is based on content written and verified during the CentOS 8 era. Consequently, the output logs and version numbers (such as for the kernel and glibc) reflect that period; however, the same configuration procedures apply to RHEL 8/9 and Rocky Linux 9.

## Configuration

### Edit `/etc/default/grub`

Modify the GRUB configuration.

```bash
vi /etc/default/grub
````

Change the following line:

```
GRUB_CMDLINE_LINUX="crashkernel=auto resume=/dev/mapper/cl-swap rd.lvm.lv=cl/root rd.lvm.lv=cl/swap";
```

to the following
(add `console=tty0 console=ttyS0,115200n8r` to the existing settings):

```
GRUB_CMDLINE_LINUX="crashkernel=auto resume=/dev/mapper/cl-swap rd.lvm.lv=cl/root rd.lvm.lv=cl/swap console=tty0 console=ttyS0,115200n8r"
```

After editing, regenerate the configuration:

```bash
grub2-mkconfig -o /boot/grub2/grub.cfg
```

### Reboot

Reboot after changing the GRUB settings.

```bash
reboot
```

## Verification

After rebooting, verify that you can connect from the KVM host.

Check the running guests:

```bash
virsh list --all
 Id    Name                         State
----------------------------------------------------
 1     mosaos-centos8               running
 5     centos8-base                 running
```

Log in via the console:

```bash
virsh console centos8-base
Connected to domain centos8-base
Escape character is ^]

CentOS Linux 8 (Core)
Kernel 4.18.0-193.el8.x86_64 on an x86_64

Activate the web console with: systemctl enable --now cockpit.socket

localhost login:
```

From here, you can proceed just as you would with a local login.
If the login prompt does not appear, press the Enter key once.

To exit, use `^]` (`Ctrl` + `]`) as shown at the beginning.

*Note:* Cockpit is also installed, and console login is available from Cockpit as well.
It may feel similar to logging in from the AWS console.

