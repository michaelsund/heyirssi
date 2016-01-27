# Needed to install libwww-perl and libjson-perl on ubuntu server
use strict;
use Irssi;
use POSIX qw/strftime/;
use LWP::UserAgent;
use JSON qw/encode_json/;


our $VERSION = '1.0';
our %IRSSI = (
    author      =>  'Michael Sund',
    name        =>  'heyirssi.pl'
);

# Notes:
# - Gonna implement setting hosts and mynick via irssi, or getting current nick
# directly from irssi.
# - Timer should be used, in case of spam

my $timer;

my $notify_flag = 1;
my @host_ips = ('13.37.1.10','13.37.1.114');
my $host_port = '4852';
my $mynick = 'timotej';

my $ua = LWP::UserAgent->new;

Irssi::settings_add_int('misc', 'notify_delay', undef);
Irssi::settings_add_str('misc', 'notify_log', '~/.irssi/notify.log');
Irssi::signal_add('message public', 'sig_message_public');
Irssi::signal_add('message private', 'sig_message_private');
Irssi::signal_add_last('gui key pressed', 'reset_timer');

Irssi::print('sending notifications to:');
foreach (@host_ips) {
    Irssi::print($_ );
}
Irssi::print('on port ' . $host_port);

sub sig_message_public {
    my ($server, $msg, $nick, $nick_addr, $target) = @_;
    if(index(lc($msg), lc($mynick)) != -1) {
      $msg = sanitise_msg($msg);
      send_to_server($msg, $nick, $target);
    }
}

sub sig_message_private {
    my ($server, $msg, $nick, $nick_addr) = @_;
    my $target = 'Message';
    $msg = sanitise_msg($msg);
    send_to_server($msg, $nick, $target);
}

sub notifier{
    $notify_flag = 1;
}

sub reset_timer{
    my $key=shift;
    if($key == 10){
        $notify_flag = 0;
        Irssi::timeout_remove($timer);
        my $timeout = Irssi::settings_get_int('notify_delay');
        if ($timeout){
            $timer = Irssi::timeout_add_once($timeout*1000, 'notifier', undef);
        }
    }
}

sub sanitise_msg{
    my ($msg) = @_;
    $msg =~ s/\\/\\\\/g;
    $msg =~ s/'/'\\''/g;
    return $msg;
}

sub send_to_server {
  my $x;
  my ($msg, $nick, $target) = @_;
  foreach $x (@host_ips) {
    my $server_endpoint = 'http://' . $x . ':' . $host_port . '/';
    my $req = HTTP::Request->new(POST => $server_endpoint);
    $req->header('content-type' => 'application/json');
    my $json = '{"msg":' . '"' . $msg . '"' . ',' . '"nick":' . '"' . $nick . '"' .  ',' . '"channel":' . '"' . $target . '"' .'}';
    $req->content($json);
    $ua->request($req);   
  }
}
