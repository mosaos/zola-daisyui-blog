+++
title = "KVM ゲストでコンソールログイン可能にする"
date = "2026-02-20"
description = "コンソールログインできない場合の設定の仕方"

[taxonomies]
tags = ["Kvm", "Linux"]
+++

KVM にはゲストにコンソールログインするための機能が備わっていますが、ゲスト自体がコンソールログイン可能に設定されていない場合、接続を行っても何も操作が行えません。

特にゲスト OS のネットワーク設定が行えていない場合には、コンソールログイン可能であると作業が捗ります ( SSH 接続して設定を行う事もできないので )。

以下では KVM ゲストの設定方法を記します。

## 環境

- KVMホスト OS : Rocky Linux 9 (CentOS 8からアップグレード)
- ブートローダー : grub2

利用している KVM 環境は Rocky 9 上に構築してあるのですが (KVMサーバがRocky9: CentOS からアップグレード)、ゲストも主に RHEL系 を利用します。  
また、毎回 OS を新規利用するのではなく、ベースとなるイメージを作成しておき、新規に KVM ゲストを作成する場合には、このベースイメージをクローンする方式を採ります。  
こうする事でベースイメージにコンソールログイン可能な設定を行っておけば、クローンしたゲストでもコンソールログイン可能になります。

※ RHEL7系 ( CentOS7 等 ) 以降で使える手順です。それ以前は grub2 ではなく grub なので別手順になります。  
※ 本記事は CentOS 8 時代に執筆・検証した内容をベースにしています。そのため、以降の出力ログやカーネル、glibc などのバージョン表記は当時のままとなっていますが、RHEL 8/9 系および Rocky Linux 9 でも同様の手順で設定可能です。

## 設定

### /etc/default/grub の編集

Grub の設定を変更します。

```bash
vi /etc/default/grub
```

以下部分を

```
GRUB_CMDLINE_LINUX="crashkernel=auto resume=/dev/mapper/cl-swap rd.lvm.lv=cl/root rd.lvm.lv=cl/swap";	
```

以下のように変更します。  
( 既存の設定に ` console=tty0 console=ttyS0,115200n8r` を追記 )

```
GRUB_CMDLINE_LINUX="crashkernel=auto resume=/dev/mapper/cl-swap rd.lvm.lv=cl/root rd.lvm.lv=cl/swap console=tty0 console=ttyS0,115200n8r"
```

編集後定義生成コマンドを実行します。

```bash
grub2-mkconfig -o /boot/grub2/grub.cfg
```

### 再起動

Grub の設定変更後再起動します。

```bash
reboot
```

## 確認

再起動したら、KVMホストから接続できるか確認しておきましょう。

実行中のゲストを確認

```bash
virsh list --all
 Id    名前                         状態
----------------------------------------------------
 1     mosaos-centos8               実行中
 5     centos8-base                 実行中
```

コンソールログインします

```bash
virsh console centos8-base
ドメイン centos8-base に接続しました
エスケープ文字は ^] です

CentOS Linux 8 (Core)
Kernel 4.18.0-193.el8.x86_64 on an x86_64

Activate the web console with: systemctl enable --now cockpit.socket

localhost login:
```

ここから後はローカルでのログインと同様に作業を行えます。  
login プロンプトが表示されない場合は、一度リターンキーを叩きましょう。

抜ける場合は最初に書いているように `^]`  ( `Ctrl` + `]` ) で可能です。

※ [Cockpit](https://cockpit-project.org/) も導入しているが、Cockpit からもコンソールログイン可能です。  
AWSコンソールからログインできる感じに似てるかも。
