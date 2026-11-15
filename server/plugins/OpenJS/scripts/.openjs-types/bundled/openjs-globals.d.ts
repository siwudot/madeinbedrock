declare namespace $ {

  interface DialogApiService {
    create(player: org.bukkit.entity.Player): DialogObject;
  }
  interface DialogObject {
    title(text: string): this;
    setTitle(text: string): this;
    columns(count: number): this;
    canCloseWithEscape(value: boolean): this;
    bodyMessage(id: string, text: string): this;
    setBodyMessage(id: string, text: string): this;
    textInput(id: string, label: string, initial?: string): this;
    rangeInput(id: string, label: string, initial?: number, min?: number, max?: number, step?: number): this;
    boolInput(id: string, label: string, initial?: boolean): this;
    item(id: string, itemStack: org.bukkit.inventory.ItemStack, description?: string): this;
    setItem(id: string, itemStack: org.bukkit.inventory.ItemStack, description?: string): this;
    baseButton(id: string, label: string): DialogButtonBuilder;
    urlButton(id: string, label: string, url: string): DialogButtonBuilder;
    confirmButtons(yesId: string, yesLabel: string, noId: string, noLabel: string): this;
    exitButton(label: string): DialogButtonBuilder;
    setButtonText(id: string, text: string): this;
    get(id: string): any;
    onEvent(handler: (event: DialogEvent) => void): this;
    show(): this;
    close(): void;
    destroy(): void;
  }
  interface DialogButtonBuilder {
    width(w: number): DialogObject;
  }
  interface DialogEvent {
    readonly type: "button" | "input" | "closed";
    readonly id: string;
    readonly value: any;
    read(key: string): any;
    get(id: string): any;
    setCancelled(cancelled?: boolean): void;
    isCancelled(): boolean;
  }

  interface FileManagerService {
    fileExists(relativePath: string): boolean;
    read(relativePath: string): string | null;
    write(relativePath: string, data: string): { success: boolean; error?: string };
    createFile(relativePath: string): java.io.File | null;
    createFolder(relativePath: string): { success: boolean; error?: string };
    getFile(relativePath: string): java.io.File | null;
    getPath(file: java.io.File): string | null;
    removeFile(relativePath: string): boolean;
    getFolder(relativePath: string): java.io.File | null;
    removeFolder(relativePath: string): boolean;
    getFiles(folderPath: string): java.io.File[];
    listenOnPath(
      relativePath: string,
      listenerType: "ENTRY_CREATE" | "ENTRY_DELETE" | "ENTRY_MODIFY",
      handler: (file: java.io.File, eventKind: string) => void
    ): FileListenerHandle | null;
    clearFileListeners(): void;
  }
  interface FileListenerHandle {
    disconnect(): void;
  }

  interface InventoryApiService {
    createItem(data: { id: string; amount?: number; name?: string; lore?: string[] }): org.bukkit.inventory.ItemStack;
    setItemLore(item: org.bukkit.inventory.ItemStack, lore: string[]): void;
    setItemName(item: org.bukkit.inventory.ItemStack, name: string): void;
    constructInventory(type: string, title: string): InventoryUI;
  }
  interface InventoryUI {
    onLeftClick(handler: (player: org.bukkit.entity.Player, slot: number, event: org.bukkit.event.inventory.InventoryClickEvent) => void): void;
    onRightClick(handler: (player: org.bukkit.entity.Player, slot: number, event: org.bukkit.event.inventory.InventoryClickEvent) => void): void;
    onItemPlaced(handler: (player: org.bukkit.entity.Player, slot: number, event: org.bukkit.event.inventory.InventoryClickEvent) => void): void;
    onClosed(handler: (player: org.bukkit.entity.Player, event: org.bukkit.event.inventory.InventoryCloseEvent) => void): void;
    getInventory(): org.bukkit.inventory.Inventory;
    setSize(size: number): void;
    setTitle(title: string): void;
    setSlot(slot: number, item: org.bukkit.inventory.ItemStack | null): void;
    getSlot(slot: number): org.bukkit.inventory.ItemStack | null;
    show(player: org.bukkit.entity.Player): void;
    hide(player: org.bukkit.entity.Player): void;
    destroy(): void;
    copy(): InventoryUI;
  }

  interface PlaceholderApiService {
    registerPlaceholder(placeholderPrefix: string, handler: { onRequest: (player: org.bukkit.entity.Player, identifier: string) => string }): void;
    unregisterPlaceholder(placeholderPrefix: string): void;
    parseString(player: org.bukkit.entity.Player, text: string): string;
  }

  interface ProtocolLibService {
    registerListener(priority: string, handler: { onSend?(event: PacketEvent): void; onReceive?(event: PacketEvent): void }, packetTypes: string[]): PacketListenerHandle;
    unregisterListener(handle: PacketListenerHandle): void;
    createPacket(packetType: string): any;
    sendServerPacket(player: org.bukkit.entity.Player, packet: any): void;
    broadcastServerPacket(packet: any, sourcePlayer?: org.bukkit.entity.Player, rangeInBlocks?: number): void;
  }
  interface PacketEvent {
    getPacket(): any;
    getPacketType(): { name(): string };
    getPlayer(): org.bukkit.entity.Player;
    isCancelled(): boolean;
    setCancelled(cancelled: boolean): void;
  }
  interface PacketListenerHandle {
    remove(): void;
  }

  interface Latch {
    readonly invoked: boolean;
    invoke(value?: any): void;
    wait(): any;
    listen(fn: (value: any) => void): void;
    fire(value?: any): void;
    connect(fn: (value: any) => void): void;
    destroy(): void;
  }
}

declare function importClass(className: string): any;
declare function importLib(libPath: string): void;

declare function getMethod(javaClass: any, methodName: string, paramClassNames: string[]): any;
declare function getMethods(javaClass: any): void;

declare function setShared(key: string, value: any): void;
declare function getShared(key: string): any;

declare function toJavaList<T = any>(array: T[]): java.util.List<T>;
declare function toArray(javaArray: any): any[];

declare function registerEvent(eventClassName: string, handler: (event: any) => void): any;
declare function unregisterEvent(listener: any): void;

declare function addCommand(
    commandName: string,
    handler: {
        onCommand(sender: org.bukkit.command.CommandSender, args: string[]): void;
        onTabComplete?(sender: org.bukkit.command.CommandSender, args: string[]): string[];
    },
    permission?: string | null
): void;
declare function removeCommand(commandName: string): void;

declare function requireScript(relativePath: string): any;
declare function LoadScript(scriptPath: string): void;
declare function UnloadScript(scriptPath: string): void;

declare const plugin: org.bukkit.plugin.Plugin;

declare const log: {
    info(message: string): void;
    warn(message: string): void;
    error(message: string): void;
};

declare const script: {
    readonly Name: string;
    readonly RelativePath: string;
    readonly File: java.io.File;
    readonly MainFolder: java.io.File;
};

declare const Services: {
    get(name: "DialogApi"): $.DialogApiService;
    get(name: "FileManager"): $.FileManagerService;
    get(name: "InventoryApi"): $.InventoryApiService;
    get(name: "PlaceholderApi"): $.PlaceholderApiService;
    get(name: "ProtocolLib"): $.ProtocolLibService;
    get(name: string): any;
};

declare const DiskApi: {
    loadFile(path: string, async: boolean, global: boolean): void;
    saveFile(path: string, async: boolean, global: boolean): void;
    getVar(fileName: string, key: string, fallback: any, global: boolean): any;
    setVar(fileName: string, key: string, value: any, global: boolean): void;
};

declare const task: {
    spawn(fn: () => void): any;
    main(fn: () => void): any;
    entitySchedule(entity: org.bukkit.entity.Entity, fn: () => void): any;
    thread(fn: () => void): any;
    delay(seconds: number, fn: () => void): any;
    repeat(delaySeconds: number, periodTicks: number, fn: () => void): any;
    cancel(taskId: any): void;
    wait(seconds: number): void;
    waitForScript(scriptName: string): void;
    waitForPlugin(pluginName: string): void;
    bindToUnload(fn: () => void): void;
    threadType(): "MAIN" | "THREAD" | "POOL";
    latch(): $.Latch;
};